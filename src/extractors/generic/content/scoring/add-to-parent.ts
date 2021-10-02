import { addScore } from './index';

// Adds 1/4 of a child's score to its parent
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
