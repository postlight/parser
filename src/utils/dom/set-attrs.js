export default function setAttrs(node, attrs) {
  if (node.attribs) {
    node.attribs = attrs;
  } else if (node.attributes) {
    node.attributes = attrs;
  }

  return node;
}

