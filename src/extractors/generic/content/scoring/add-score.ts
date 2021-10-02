import { getOrInitScore, setScore } from './index';

export function addScore(
  $node: cheerio.Cheerio,
  $: cheerio.Root,
  amount: number
) {
  try {
    const score = getOrInitScore($node, $) + amount;
    setScore($node, score);
  } catch (e) {
    // Ignoring; error occurs in scoreNode
  }

  return $node;
}
