import URL from 'url';
import parseSrcset from 'parse-srcset';

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

function stringifySetCandidate(candidate) {
  let candidateString = candidate.url;
  if (candidate.d) {
    candidateString = `${candidateString} ${candidate.d}x`;
  }
  if (candidate.w) {
    candidateString = `${candidateString} ${candidate.w}w`;
  }
  if (candidate.h) {
    candidateString = `${candidateString} ${candidate.h}h`;
  }
  return candidateString;
}

function absolutizeSet($, rootUrl, attr, $content) {
  $(`[${attr}]`, $content).each((_, node) => {
    const attrs = getAttrs(node);
    const urlSet = attrs[attr];

    if (urlSet) {
      const parsedSet = parseSrcset(urlSet);
      const absoluteUrlSet = parsedSet.map((candidate) => {
        const absoluteUrl = URL.resolve(rootUrl, candidate.url);
        return stringifySetCandidate({ ...candidate, url: absoluteUrl });
      }).join(', ');
      setAttr(node, attr, absoluteUrlSet);
    }
  });
}

export default function makeLinksAbsolute($content, $, url) {
  ['href', 'src'].forEach(attr => absolutize($, url, attr, $content));
  ['srcset'].forEach(attr => absolutizeSet($, url, attr, $content));

  return $content;
}
