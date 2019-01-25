import { cleanDatePublished } from 'cleaners';
import { extractFromMeta, extractFromSelectors } from 'utils/dom';
import { extractFromUrl } from 'utils/text';

import {
  DATE_PUBLISHED_META_TAGS,
  DATE_PUBLISHED_SELECTORS,
  DATE_PUBLISHED_URL_RES,
} from './constants';

const GenericDatePublishedExtractor = {
  extract({ $, url, metaCache }) {
    let datePublished;
    // First, check to see if we have a matching meta tag
    // that we can make use of.
    // Don't try cleaning tags from this string
    datePublished = extractFromMeta(
      $,
      DATE_PUBLISHED_META_TAGS,
      metaCache,
      false
    );
    if (datePublished) return cleanDatePublished(datePublished);

    // Second, look through our selectors looking for potential
    // date_published's.
    datePublished = extractFromSelectors($, DATE_PUBLISHED_SELECTORS);
    if (datePublished) return cleanDatePublished(datePublished);

    // Lastly, look to see if a dately string exists in the URL
    datePublished = extractFromUrl(url, DATE_PUBLISHED_URL_RES);
    if (datePublished) return cleanDatePublished(datePublished);

    return null;
  },
};

export default GenericDatePublishedExtractor;
