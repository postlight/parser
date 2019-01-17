import { convertNodeTo } from 'utils/dom';

import { HNEWS_CONTENT_SELECTORS } from './constants';
import { scoreNode, setScore, getOrInitScore, addScore } from './index';

function convertSpans($node, $) {
  if ($node.get(0)) {
    const { tagName } = $node.get(0);

    if (tagName === 'span') {
      // convert spans to divs
      convertNodeTo($node, $, 'div');
    }
  }
}

function addScoreTo($node, $, score) {
  if ($node) {
    convertSpans($node, $);
    addScore($node, $, score);
  }
}

function scorePs($, weightNodes) {
  $('p, pre')
    .not('[score]')
    .each((index, node) => {
      // The raw score for this paragraph, before we add any parent/child
      // scores.
      let $node = $(node);
      $node = setScore($node, $, getOrInitScore($node, $, weightNodes));

      const $parent = $node.parent();
      const rawScore = scoreNode($node);

      addScoreTo($parent, $, rawScore, weightNodes);
      if ($parent) {
        // Add half of the individual content score to the
        // grandparent
        addScoreTo($parent.parent(), $, rawScore / 2, weightNodes);
      }
    });

  return $;
}

// score content. Parents get the full value of their children's
// content score, grandparents half
export default function scoreContent($, weightNodes = true) {
  // First, look for special hNews based selectors and give them a big
  // boost, if they exist
  HNEWS_CONTENT_SELECTORS.forEach(([parentSelector, childSelector]) => {
    $(`${parentSelector} ${childSelector}`).each((index, node) => {
      addScore($(node).parent(parentSelector), $, 80);
    });
  });

  // Doubling this again
  // Previous solution caused a bug
  // in which parents weren't retaining
  // scores. This is not ideal, and
  // should be fixed.
  scorePs($, weightNodes);
  scorePs($, weightNodes);

  return $;
}
