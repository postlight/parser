import { textLength, linkDensity } from 'utils/dom';
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

  const siblingScoreThreshold = Math.max(10, topScore * 0.25);
  const wrappingDiv = $('<div></div>');

  $candidate
    .parent()
    .children()
    .each((index, sibling) => {
      const $sibling = $(sibling);
      // Ignore tags like BR, HR, etc
      if (NON_TOP_CANDIDATE_TAGS_RE.test(sibling.tagName)) {
        return null;
      }

      const siblingScore = getScore($sibling);
      if (siblingScore) {
        if ($sibling.get(0) === $candidate.get(0)) {
          wrappingDiv.append($sibling);
        } else {
          let contentBonus = 0;
          const density = linkDensity($sibling);

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
          if ($sibling.attr('class') === $candidate.attr('class')) {
            contentBonus += topScore * 0.2;
          }

          const newScore = siblingScore + contentBonus;

          if (newScore >= siblingScoreThreshold) {
            return wrappingDiv.append($sibling);
          }
          if (sibling.tagName === 'p') {
            const siblingContent = $sibling.text();
            const siblingContentLength = textLength(siblingContent);

            if (siblingContentLength > 80 && density < 0.25) {
              return wrappingDiv.append($sibling);
            }
            if (
              siblingContentLength <= 80 &&
              density === 0 &&
              hasSentenceEnd(siblingContent)
            ) {
              return wrappingDiv.append($sibling);
            }
          }
        }
      }

      return null;
    });

  if (
    wrappingDiv.children().length === 1 &&
    wrappingDiv
      .children()
      .first()
      .get(0) === $candidate.get(0)
  ) {
    return $candidate;
  }

  return wrappingDiv;
}
