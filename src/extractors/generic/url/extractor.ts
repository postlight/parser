import { parse } from 'url';
import { extractFromMeta } from '../../../utils/dom';

import { CANONICAL_META_SELECTORS } from './constants';

function parseDomain(url: string) {
  const parsedUrl = parse(url);
  const { hostname } = parsedUrl;
  return hostname;
}

function result(url: string) {
  return {
    url,
    domain: parseDomain(url),
  };
}

export const GenericUrlExtractor = {
  extract({
    $,
    url,
    metaCache,
  }: {
    $: cheerio.Root;
    url: string;
    metaCache: string[];
  }) {
    const $canonical = $('link[rel=canonical]');
    if ($canonical.length !== 0) {
      const href = $canonical.attr('href');
      if (href) {
        return result(href);
      }
    }

    const metaUrl = extractFromMeta($, CANONICAL_META_SELECTORS, metaCache);
    if (metaUrl) {
      return result(metaUrl);
    }

    return result(url);
  },
};
