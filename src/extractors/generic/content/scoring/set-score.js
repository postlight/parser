export default function setScore($node, $, score) {
  $node.attr('score', score);
  return $node;
}
