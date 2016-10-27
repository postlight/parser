import {
  NEGATIVE_SCORE_RE,
  POSITIVE_SCORE_RE,
  PHOTO_HINTS_RE,
  READABILITY_ASSET,
} from './constants';

// Get the score of a node based on its className and id.
export default function getWeight(node) {
  const classes = node.attr('class');
  const id = node.attr('id');
  let score = 0;

  if (id) {
    // if id exists, try to score on both positive and negative
    if (POSITIVE_SCORE_RE.test(id)) {
      score += 25;
    }
    if (NEGATIVE_SCORE_RE.test(id)) {
      score -= 25;
    }
  }

  if (classes) {
    if (score === 0) {
      // if classes exist and id did not contribute to score
      // try to score on both positive and negative
      if (POSITIVE_SCORE_RE.test(classes)) {
        score += 25;
      }
      if (NEGATIVE_SCORE_RE.test(classes)) {
        score -= 25;
      }
    }

    // even if score has been set by id, add score for
    // possible photo matches
    // "try to keep photos if we can"
    if (PHOTO_HINTS_RE.test(classes)) {
      score += 10;
    }

    // add 25 if class matches entry-content-asset,
    // a class apparently instructed for use in the
    // Readability publisher guidelines
    // https://www.readability.com/developers/guidelines
    if (READABILITY_ASSET.test(classes)) {
      score += 25;
    }
  }

  return score;
}
