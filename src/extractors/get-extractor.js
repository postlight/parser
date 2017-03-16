import URL from 'url';

import Extractors from './all';
import GenericExtractor from './generic';
import detectByHtml from './detect-by-html';
import checkByFile from './check-by-file';

export default function getExtractor(url, parsedUrl, $, headers) {
  parsedUrl = parsedUrl || URL.parse(url);
  const { hostname } = parsedUrl;
  const baseDomain = hostname.split('.').slice(-2).join('.');

  return checkByFile(headers) || Extractors[hostname] || Extractors[baseDomain] ||
    detectByHtml($) || GenericExtractor;
}
