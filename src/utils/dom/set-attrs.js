export default function setAttrs(node, attrs) {
  if (node.attribs) {
    node.attribs = attrs;
  } else if (node.attributes) {
    while (node.attributes.length > 0) {
      node.removeAttribute(node.attributes[0].name);
    }

    Reflect.ownKeys(attrs).forEach(key => {
      node.setAttribute(key, attrs[key]);
    });
  }

  return node;
}
