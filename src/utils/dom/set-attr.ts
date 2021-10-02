import { isTagElement } from '../types';

export function setAttr(
  node: cheerio.Element,
  attr: string,
  val: string | undefined
) {
  if (isTagElement(node)) {
    if (val === undefined) {
      delete node.attribs[attr];
    } else {
      node.attribs[attr] = val;
    }
  }
  // else if (node.attributes) {
  //   node.setAttribute(attr, val);
  // }

  return node;
}
