import URL from 'url';

import { getAttrs, isWordpress } from 'utils/dom';
import { removeAnchor, pageNumFromUrl } from 'utils/text';

import {
  scoreSimilarity,
  scoreLinkText,
  scorePageInLink,
  scoreExtraneousLinks,
  scoreByParents,
  scorePrevLink,
  shouldScore,
  scoreBaseUrl,
  scoreCapLinks,
  scoreNextLinkText,
} from './utils';

export function makeBaseRegex(baseUrl) {
  return new RegExp(`^${baseUrl}`, 'i');
}

function makeSig($link, linkText) {
  return `${linkText || $link.text()} ${$link.attr('class') || ''} ${$link.attr(
    'id'
  ) || ''}`;
}

export default function scoreLinks({
  links,
  articleUrl,
  baseUrl,
  parsedUrl,
  $,
  previousUrls = [],
}) {
  parsedUrl = parsedUrl || URL.parse(articleUrl);
  const baseRegex = makeBaseRegex(baseUrl);
  const isWp = isWordpress($);

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
    const attrs = getAttrs(link);

    // if href is undefined, return
    if (!attrs.href) return possiblePages;

    const href = removeAnchor(attrs.href);
    const $link = $(link);
    const linkText = $link.text();

    if (
      !shouldScore(href, articleUrl, baseUrl, parsedUrl, linkText, previousUrls)
    ) {
      return possiblePages;
    }

    // ## PASSED THE FIRST-PASS TESTS. Start scoring. ##
    if (!possiblePages[href]) {
      possiblePages[href] = {
        score: 0,
        linkText,
        href,
      };
    } else {
      possiblePages[href].linkText = `${
        possiblePages[href].linkText
      }|${linkText}`;
    }

    const possiblePage = possiblePages[href];
    const linkData = makeSig($link, linkText);
    const pageNum = pageNumFromUrl(href);

    let score = scoreBaseUrl(href, baseRegex);
    score += scoreNextLinkText(linkData);
    score += scoreCapLinks(linkData);
    score += scorePrevLink(linkData);
    score += scoreByParents($link);
    score += scoreExtraneousLinks(href);
    score += scorePageInLink(pageNum, isWp);
    score += scoreLinkText(linkText, pageNum);
    score += scoreSimilarity(score, articleUrl, href);

    possiblePage.score = score;

    return possiblePages;
  }, {});

  return Reflect.ownKeys(scoredPages).length === 0 ? null : scoredPages;
}
