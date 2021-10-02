import { isTagElement } from '../types';

export function setAttr(node: cheerio.Element, attr: string, val: string) {
  if (isTagElement(node)) {
    node.attribs[attr] = val;
  }
  // else if (node.attributes) {
  //   node.setAttribute(attr, val);
  // }

  return node;
}
