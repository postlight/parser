import { range } from 'utils';
import {
  NEGATIVE_SCORE_RE,
  POSITIVE_SCORE_RE,
  PAGE_RE,
} from 'utils/dom/constants';
import { EXTRANEOUS_LINK_HINTS_RE } from '../constants';

function makeSig($link) {
  return `${$link.attr('class') || ''} ${$link.attr('id') || ''}`;
}

export default function scoreByParents($link) {
  // If a parent node contains paging-like classname or id, give a
  // bonus. Additionally, if a parent_node contains bad content
  // (like 'sponsor'), give a penalty.
  let $parent = $link.parent();
  let positiveMatch = false;
  let negativeMatch = false;
  let score = 0;

  Array.from(range(0, 4)).forEach(() => {
    if ($parent.length === 0) {
      return;
    }

    const parentData = makeSig($parent, ' ');

    // If we have 'page' or 'paging' in our data, that's a good
    // sign. Add a bonus.
    if (!positiveMatch && PAGE_RE.test(parentData)) {
      positiveMatch = true;
      score += 25;
    }

    // If we have 'comment' or something in our data, and
    // we don't have something like 'content' as well, that's
    // a bad sign. Give a penalty.
    if (
      !negativeMatch &&
      NEGATIVE_SCORE_RE.test(parentData) &&
      EXTRANEOUS_LINK_HINTS_RE.test(parentData)
    ) {
      if (!POSITIVE_SCORE_RE.test(parentData)) {
        negativeMatch = true;
        score -= 25;
      }
    }

    $parent = $parent.parent();
  });

  return score;
}
