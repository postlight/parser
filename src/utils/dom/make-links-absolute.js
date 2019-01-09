import URL from 'url';

import { getAttrs, setAttr } from 'utils/dom';

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

function absolutizeSet($, rootUrl, attr, $content) {
  $(`[${attr}]`, $content).each((_, node) => {
    const attrs = getAttrs(node);
    const urlSet = attrs[attr];

    if (urlSet) {
      const absoluteUrlSet = urlSet.split(',').map((url) => {
        const urlParts = url.trim().split(/\s+/);
        let absoluteUrl = URL.resolve(rootUrl, urlParts[0]);
        if (urlParts[1]) {
          absoluteUrl = `${absoluteUrl} ${urlParts[1]}`;
        }
        return absoluteUrl;
      }).join(',');
      setAttr(node, attr, absoluteUrlSet);
    }
  });
}

export default function makeLinksAbsolute($content, $, url) {
  ['href', 'src'].forEach(attr => absolutize($, url, attr, $content));
  ['srcset'].forEach(attr => absolutizeSet($, url, attr, $content));

  return $content;
}
