// returns the score of a node based on
// the node's score attribute
// returns null if no score set
export function getScore($node: cheerio.Cheerio) {
  return parseFloat($node.attr('score') ?? '0') || undefined;
}
