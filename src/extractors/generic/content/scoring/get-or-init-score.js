import { getScore, scoreNode, getWeight, addToParent } from './index';

// gets and returns the score if it exists
// if not, initializes a score based on
// the node's tag type
export default function getOrInitScore($node, $, weightNodes = true) {
  let score = getScore($node);

  if (score) {
    return score;
  }

  score = scoreNode($node);

  if (weightNodes) {
    score += getWeight($node);
  }

  addToParent($node, $, score);

  return score;
}
