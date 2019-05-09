import URL from 'url';

import mergeSupportedDomains from 'utils/merge-supported-domains';
import Extractors from './all';
import GenericExtractor from './generic';
import detectByHtml from './detect-by-html';

const apiExtractors = {};

export default function getExtractor(url, parsedUrl, $) {
  parsedUrl = parsedUrl || URL.parse(url);
  const { hostname } = parsedUrl;
  const baseDomain = hostname
    .split('.')
    .slice(-2)
    .join('.');

  return (
    apiExtractors[hostname] ||
    apiExtractors[baseDomain] ||
    Extractors[hostname] ||
    Extractors[baseDomain] ||
    detectByHtml($) ||
    GenericExtractor
  );
}

export function addExtractor(extractor) {
  if (extractor) Object.assign(apiExtractors, mergeSupportedDomains(extractor));
}
