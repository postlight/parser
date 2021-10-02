import { getScore, scoreNode, getWeight, addToParent } from './index';

// gets and returns the score if it exists
// if not, initializes a score based on
// the node's tag type
export function getOrInitScore(
  $node: cheerio.Cheerio,
  $: cheerio.Root,
  weightNodes = true
): number {
  const savedScore = getScore($node);

  if (savedScore) {
    return savedScore;
  }

  let score = scoreNode($node);

  if (weightNodes) {
    score += getWeight($node);
  }

  addToParent($node, $, score);

  return score;
}
