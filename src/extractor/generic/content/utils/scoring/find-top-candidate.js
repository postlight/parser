import { NON_TOP_CANDIDATE_TAGS_RE } from '../constants'
import { getScore } from './index'
import {
  textLength,
  linkDensity
} from '../../../../../utils/dom'

// After we've calculated scores, loop through all of the possible
// candidate nodes we found and find the one with the highest score.
export default function findTopCandidate($) {
  let $candidate, topScore = 0

  $('*[score]').each((index, node) => {
    const $node = $(node)
    // Ignore tags like BR, HR, etc
    if (NON_TOP_CANDIDATE_TAGS_RE.test(node.tagName)) {
      return
    }

    const score = getScore($node)

    if (score > topScore) {
      topScore = score
      $candidate = $node
    }
  })

  // If we don't have a candidate, return the body
  // or whatever the first element is
  if (!$candidate) {
    return $('body') || $('*').first()
  }

  $candidate = mergeSiblings($candidate, topScore, $)

  return $candidate
}

// Now that we have a top_candidate, look through the siblings of
// it to see if any of them are decently scored. If they are, they
// may be split parts of the content (Like two divs, a preamble and
// a body.) Example:
// http://articles.latimes.com/2009/oct/14/business/fi-bigtvs14
export function mergeSiblings($candidate, topScore, $) {
  if (!$candidate.parent().length) {
    return $candidate
  }

  const siblingScoreThreshold = Math.max(10, topScore * 0.2)
  let wrappingDiv = $('<div></div>')

  $candidate.parent().children().each((index, child) => {
    const $child = $(child)
    // Ignore tags like BR, HR, etc
    if (NON_TOP_CANDIDATE_TAGS_RE.test(child.tagName)) {
      return
    }

    const childScore = getScore($child)
    if (childScore) {
      if ($child === $candidate) {
        wrappingDiv.append($child)
      } else {
        let contentBonus = 0
        // extract to scoreLinkDensity() TODO
        const density = linkDensity($child)

        // If sibling has a very low link density,
        // give it a small bonus
        if (density < .05) {
          contentBonus = contentBonus + 20
        }

        // If sibling has a high link density,
        // give it a penalty
        if (density >= 0.5) {
          contentBonus = contentBonus - 20
        }

        // If sibling node has the same class as
        // candidate, give it a bonus
        if ($child.attr('class') === $candidate.attr('class')) {
          contentBonus = contentBonus + topScore * .2
        }

        const newScore = getScore($child) + contentBonus

        if (newScore >= siblingScoreThreshold) {
          return wrappingDiv.append($child)
        } else if (child.tagName === 'p') {
          const childContentLength = textLength($child.text())

          if (childContentLength > 80 && density < .25) {
            return wrappingDiv.append($child)
          } else if (childContentLength <= 80 && density === 0 &&
                    hasSentenceEnd(childContent)) {

            return wrappingDiv.append($child)
          }
        }
      }
    }

  })

  return wrappingDiv
}

// TODO Extract into util - AP
// Given a string, return True if it appears to have an ending sentence
// within it, false otherwise.
const SENTENCE_END_RE = new RegExp('\.( |$)')
function hasSentenceEnd(text) {
  return SENTENCE_END_RE.test(text)
}
