export default function convertNodeTo($node, $, tag = 'p') {
  const node = $node.get(0);
  if (!node) {
    return $;
  }
  const { attribs } = $node.get(0);
  const attribString = Reflect.ownKeys(attribs)
                              .map(key => `${key}=${attribs[key]}`)
                              .join(' ');

  $node.replaceWith(`<${tag} ${attribString}>${$node.contents()}</${tag}>`);
  return $;
}
