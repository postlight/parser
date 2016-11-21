import URL from 'url';

import {
  getAttrs,
  setAttr,
} from 'utils/dom';

function absolutize($, rootUrl, attr, $content) {
  $(`[${attr}]`, $content).each((_, node) => {
    const attrs = getAttrs(node);
    const url = attrs[attr];

    if (url) {
      const absoluteUrl = URL.resolve(rootUrl, url);
      setAttr(node, attr, absoluteUrl);
    }
  });
}

export default function makeLinksAbsolute($content, $, url) {
  ['href', 'src'].forEach(attr => absolutize($, url, attr, $content));

  return $content;
}
