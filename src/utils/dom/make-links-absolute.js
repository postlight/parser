import URL from 'url';

import {
  getAttrs,
  setAttr,
} from 'utils/dom';

function absolutize($, rootUrl, attr, $content) {
  const baseUrl = $('base').attr('href');

  $(`[${attr}]`, $content).each((_, node) => {
    const attrs = getAttrs(node);
    const url = attrs[attr];
    let absoluteUrl = '';

    if (url && !baseUrl) {
      absoluteUrl = URL.resolve(rootUrl, url);
    } else {
      absoluteUrl = baseUrl.concat(url);
    }
    setAttr(node, attr, absoluteUrl);
  });
}

export default function makeLinksAbsolute($content, $, url) {
  ['href', 'src'].forEach(attr => absolutize($, url, attr, $content));

  return $content;
}
