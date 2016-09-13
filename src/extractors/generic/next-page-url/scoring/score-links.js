import 'babel-polyfill'
import URL from 'url'
import difflib from 'difflib'

import { range } from 'utils'
import { isWordpress } from 'utils/dom'
import {
  removeAnchor,
  pageNumFromUrl,
} from 'utils/text'
import {
  DIGIT_RE,
  NEXT_LINK_TEXT_RE,
  PREV_LINK_TEXT_RE,
  EXTRANEOUS_LINK_HINTS_RE,
  CAP_LINK_TEXT_RE,
  PAGE_RE,
} from './constants'

import {
  NEGATIVE_SCORE_RE,
  POSITIVE_SCORE_RE,
} from 'utils/dom/constants'
import { IS_DIGIT_RE } from 'utils/text/constants'

export default function scoreLinks({
  links,
  articleUrl,
  baseUrl,
  parsedUrl,
  $,
  previousUrls=[]
}) {
  parsedUrl = parsedUrl || URL.parse(articleUrl)
  const baseRegex = makeBaseRegex(baseUrl)
  const isWp = isWordpress($)

  // Loop through all links, looking for hints that they may be next-page
  // links. Things like having "page" in their textContent, className or
  // id, or being a child of a node with a page-y className or id.
  //
  // After we do that, assign each page a score, and pick the one that
  // looks most like the next page link, as long as its score is strong
  // enough to have decent confidence.
  const scoredPages = links.reduce((possiblePages, link) => {
    // Remove any anchor data since we don't do a good job
    // standardizing URLs (it's hard), we're going to do
    // some checking with and without a trailing slash
    let href = removeAnchor(link.attribs.href)
    const $link = $(link)
    const linkText = $link.text()

    if (!shouldScore(href, articleUrl, baseUrl, parsedUrl, linkText, previousUrls)) {
      return possiblePages
    }

    // ## PASSED THE FIRST-PASS TESTS. Start scoring. ##
    if (!possiblePages[href]) {
      possiblePages[href] = {
        score: 0,
        linkText,
        href,
      }
    } else {
      possiblePages[href].linkText = `${possiblePages[href].linkText}|${linkText}`
    }

    const possiblePage = possiblePages[href]
    const linkData = makeSig($link, linkText)
    const pageNum = pageNumFromUrl(href)

    let score = scoreBaseUrl(href, baseRegex)
    score = score + scoreNextLinkText(linkData)
    score = score + scoreCapLinks(linkData)
    score = score + scorePrevLink(linkData)
    score = score + scoreByParents($link)
    score = score + scoreExtraneousLinks(href)
    score = score + scorePageInLink(pageNum, isWp)
    score = score + scoreLinkText(linkText, pageNum)
    score = score + scoreSimilarity(score, articleUrl, href)

    possiblePage.score = score

    return possiblePages
  }, {})

  return Reflect.ownKeys(scoredPages).length === 0 ? null : scoredPages
}

export function makeBaseRegex(baseUrl) {
  return new RegExp(`^${baseUrl}`, 'i')
}

export function scoreSimilarity(score, articleUrl, href) {
  // Do this last and only if we have a real candidate, because it's
  // potentially expensive computationally. Compare the link to this
  // URL using difflib to get the % similarity of these URLs. On a
  // sliding scale, subtract points from this link based on
  // similarity.
  if (score > 0) {
    const similarity = new difflib.SequenceMatcher(null, articleUrl, href).ratio()
    // Subtract .1 from diff_percent when calculating modifier,
    // which means that if it's less than 10% different, we give a
    // bonus instead. Ex:
    //  3% different = +17.5 points
    // 10% different = 0 points
    // 20% different = -25 points
    const diffPercent = 1.0 - similarity
    const diffModifier = -(250 * (diffPercent - 0.2))
    return score + diffModifier
  }

  return 0
}

export function scoreLinkText(linkText, pageNum) {
  // If the link text can be parsed as a number, give it a minor
  // bonus, with a slight bias towards lower numbered pages. This is
  // so that pages that might not have 'next' in their text can still
  // get scored, and sorted properly by score.
  let score = 0

  if (IS_DIGIT_RE.test(linkText.trim())) {
    const linkTextAsNum = parseInt(linkText)
    // If it's the first page, we already got it on the first call.
    // Give it a negative score. Otherwise, up to page 10, give a
    // small bonus.
    if (linkTextAsNum < 2) {
      score = -30
    } else {
      score = Math.max(0, 10 - linkTextAsNum)
    }

    // If it appears that the current page number is greater than
    // this links page number, it's a very bad sign. Give it a big
    // penalty.
    if (pageNum && pageNum >= linkTextAsNum) {
      score = score - 50
    }
  }

  return score
}

export function scorePageInLink(pageNum, isWp) {
  // page in the link = bonus. Intentionally ignore wordpress because
  // their ?p=123 link style gets caught by this even though it means
  // separate documents entirely.
  if (pageNum && !isWp) {
    return 50
  }

  return 0
}

export function scoreExtraneousLinks(href) {
  // If the URL itself contains extraneous values, give a penalty.
  if (EXTRANEOUS_LINK_HINTS_RE.test(href)) {
    return -25
  }

  return 0
}

export function scoreByParents($link) {
  // If a parent node contains paging-like classname or id, give a
  // bonus. Additionally, if a parent_node contains bad content
  // (like 'sponsor'), give a penalty.
  let $parent = $link.parent()
  let positiveMatch = false
  let negativeMatch = false
  let score = 0

  Array.from(range(0, 4)).forEach((_) => {
    if ($parent.length === 0) {
      return
    }

    const parentData = makeSig($parent, ' ')

    // If we have 'page' or 'paging' in our data, that's a good
    // sign. Add a bonus.
    if (!positiveMatch && PAGE_RE.test(parentData)) {
      positiveMatch = true
      score = score + 25
    }

    // If we have 'comment' or something in our data, and
    // we don't have something like 'content' as well, that's
    // a bad sign. Give a penalty.
    if (!negativeMatch && NEGATIVE_SCORE_RE.test(parentData)
       && EXTRANEOUS_LINK_HINTS_RE.test(parentData)) {
         if (!POSITIVE_SCORE_RE.test(parentData)) {
           negativeMatch = true
           score = score - 25
         }
    }

    $parent = $parent.parent()
  })

  return score
}

export function scorePrevLink(linkData) {
  // If the link has something like "previous", its definitely
  // an old link, skip it.
  if (PREV_LINK_TEXT_RE.test(linkData)) {
    return -200
  }

  return 0
}

export function scoreCapLinks(linkData) {
  // Cap links are links like "last", etc.
  if (CAP_LINK_TEXT_RE.test(linkData)) {
    // If we found a link like "last", but we've already seen that
    // this link is also "next", it's fine. If it's not been
    // previously marked as "next", then it's probably bad.
    // Penalize.
    if (NEXT_LINK_TEXT_RE.test(linkData)) {
      return -65
    }
  }

  return 0
}

export function scoreNextLinkText(linkData) {
  // Things like "next", ">>", etc.
  if (NEXT_LINK_TEXT_RE.test(linkData)) {
    return 50
  }

  return 0
}

export function scoreBaseUrl(href, baseRegex) {
  // If the baseUrl isn't part of this URL, penalize this
  // link. It could still be the link, but the odds are lower.
  // Example:
  // http://www.actionscript.org/resources/articles/745/1/JavaScript-and-VBScript-Injection-in-ActionScript-3/Page1.html
  if (!baseRegex.test(href)) {
    return -25
  }

  return 0
}

export function shouldScore(
  href,
  articleUrl,
  baseUrl,
  parsedUrl,
  linkText,
  previousUrls
) {
  // skip if we've already fetched this url
  if(previousUrls.find((url) => href === url) !== undefined) {
    return false
  }

  // If we've already parsed this URL, or the URL matches the base
  // URL, or is empty, skip it.
  if (!href || href === articleUrl || href === baseUrl) {
    return false
  }

  const { hostname } = parsedUrl
  const { hostname: linkHost } = URL.parse(href)

  // Domain mismatch.
  if (linkHost !== hostname) {
    return false
  }

  // If href doesn't contain a digit after removing the base URL,
  // it's certainly not the next page.
  const fragment = href.replace(baseUrl, '')
  if (!DIGIT_RE.test(fragment)) {
    return false
  }

  // This link has extraneous content (like "comment") in its link
  // text, so we skip it.
  if (EXTRANEOUS_LINK_HINTS_RE.test(linkText)) {
    return false
  }

  // Next page link text is never long, skip if it is too long.
  if (linkText.length > 25) {
    return false
  }

  return true
}

function makeSig($link, linkText) {
  return `${linkText || $link.text()} ${$link.attr('class') || ''} ${$link.attr('id') || ''}`
}
