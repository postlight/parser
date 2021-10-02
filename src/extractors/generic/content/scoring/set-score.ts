export function setScore($node: cheerio.Cheerio, score: number) {
  $node.attr('score', String(score));
  return $node;
}
