export default function getAttrs(node) {
  const { attribs, attributes } = node;

  return attribs || attributes;
}
