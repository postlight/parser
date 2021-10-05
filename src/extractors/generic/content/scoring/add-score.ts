import { getScore } from './get-score';
import { getWeight } from './get-weight';
import { scoreNode } from './score-node';
import { setScore } from './set-score';

export function addScore(
  $node: cheerio.Cheerio,
  $: cheerio.Root,
  amount: number
) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const score = getOrInitScore($node, $) + amount;
    setScore($node, score);
  } catch (e) {
    // Ignoring; error occurs in scoreNode
  }

  return $node;
}

export function addToParent(
  node: cheerio.Cheerio,
  $: cheerio.Root,
  score: number
) {
  const parent = node.parent();
  if (parent) {
    addScore(parent, $, score * 0.25);
  }

  return node;
}

/**  gets and returns the score if it exists
 * if not, initializes a score based on the
 * node's tag type
 */
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
