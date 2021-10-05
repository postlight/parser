import Extractors from './all';
import { GenericExtractor } from './generic';
import { detectByHtml } from './detect-by-html';
import { apiExtractors } from './add-extractor';

export function getExtractor(url: string, parsedUrl: URL, $: cheerio.Root) {
  const test = Extractors.default;
  parsedUrl = parsedUrl || new URL(url);
  const { hostname } = parsedUrl;
  const baseDomain = hostname?.split('.').slice(-2).join('.') ?? '';

  return (
    (hostname && apiExtractors[hostname]) ||
    apiExtractors[baseDomain] ||
    (hostname && Extractors[hostname]) ||
    Extractors[baseDomain] ||
    detectByHtml($) ||
    GenericExtractor
  );
}
