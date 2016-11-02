export default function setAttr(node, attr, val) {
  if (node.attribs) {
    node.attribs[attr] = val;
  } else if (node.attributes) {
    node.setAttribute(attr, val);
  }

  return node;
}
