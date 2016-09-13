export default function convertNodeTo($node, $, tag = 'p') {
  $node.replaceWith(`<${tag}>${$node.contents()}</${tag}>`);
  return $;
}
