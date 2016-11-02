import { getAttrs } from 'utils/dom';

export default function convertNodeTo($node, $, tag = 'p') {
  const node = $node.get(0);
  if (!node) {
    return $;
  }
  const attrs = getAttrs(node);

  const attribString = Reflect.ownKeys(attrs)
                              .map(key => `${key}=${attrs[key]}`)
                              .join(' ');

  $node.replaceWith(`<${tag} ${attribString}>${$node.contents()}</${tag}>`);
  return $;
}
