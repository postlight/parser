// Given a node, determine if it's article-like enough to return
// param: node (a cheerio node)
// return: boolean

export function nodeIsSufficient($node: cheerio.Cheerio) {
  return $node.text().trim().length >= 100;
}
