// returns the score of a node based on
// the node's score attribute
// returns null if no score set
export default function getScore($node) {
  return parseFloat($node.attr('score')) || null;
}
