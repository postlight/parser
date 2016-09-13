import {
  textLength,
  linkDensity,
} from 'utils/dom';
import { hasSentenceEnd } from 'utils/text';

import { NON_TOP_CANDIDATE_TAGS_RE } from './constants';
import { getScore } from './index';

// Now that we have a top_candidate, look through the siblings of
// it to see if any of them are decently scored. If they are, they
// may be split parts of the content (Like two divs, a preamble and
// a body.) Example:
// http://articles.latimes.com/2009/oct/14/business/fi-bigtvs14
export default function mergeSiblings($candidate, topScore, $) {
  if (!$candidate.parent().length) {
    return $candidate;
  }

  const siblingScoreThreshold = Math.max(10, topScore * 0.2);
  const wrappingDiv = $('<div></div>');

  $candidate.parent().children().each((index, child) => {
    const $child = $(child);
    // Ignore tags like BR, HR, etc
    if (NON_TOP_CANDIDATE_TAGS_RE.test(child.tagName)) {
      return null;
    }

    const childScore = getScore($child);
    if (childScore) {
      if ($child === $candidate) {
        wrappingDiv.append($child);
      } else {
        let contentBonus = 0;
        // extract to scoreLinkDensity() TODO
        const density = linkDensity($child);

        // If sibling has a very low link density,
        // give it a small bonus
        if (density < 0.05) {
          contentBonus += 20;
        }

        // If sibling has a high link density,
        // give it a penalty
        if (density >= 0.5) {
          contentBonus -= 20;
        }

        // If sibling node has the same class as
        // candidate, give it a bonus
        if ($child.attr('class') === $candidate.attr('class')) {
          contentBonus += topScore * 0.2;
        }

        const newScore = getScore($child) + contentBonus;

        if (newScore >= siblingScoreThreshold) {
          return wrappingDiv.append($child);
        } else if (child.tagName === 'p') {
          const childContent = $child.text();
          const childContentLength = textLength(childContent);

          if (childContentLength > 80 && density < 0.25) {
            return wrappingDiv.append($child);
          } else if (childContentLength <= 80 && density === 0 &&
                    hasSentenceEnd(childContent)) {
            return wrappingDiv.append($child);
          }
        }
      }
    }

    return null;
  });

  return wrappingDiv;
}
