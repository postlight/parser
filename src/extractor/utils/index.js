// Given a node, determine if it's article-like enough to return
export function nodeIsSufficient(node) {
  return node.text().trim().length >= 100
}
