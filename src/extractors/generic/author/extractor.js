import { cleanAuthor } from 'cleaners';
import { extractFromMeta, extractFromSelectors } from 'utils/dom';

import {
  AUTHOR_META_TAGS,
  AUTHOR_MAX_LENGTH,
  AUTHOR_SELECTORS,
  BYLINE_SELECTORS_RE,
} from './constants';

const GenericAuthorExtractor = {
  extract({ $, metaCache }) {
    let author;

    // First, check to see if we have a matching
    // meta tag that we can make use of.
    author = extractFromMeta($, AUTHOR_META_TAGS, metaCache);
    if (author && author.length < AUTHOR_MAX_LENGTH) {
      return cleanAuthor(author);
    }

    // Second, look through our selectors looking for potential authors.
    author = extractFromSelectors($, AUTHOR_SELECTORS, 2);
    if (author && author.length < AUTHOR_MAX_LENGTH) {
      return cleanAuthor(author);
    }

    // Last, use our looser regular-expression based selectors for
    // potential authors.
    // eslint-disable-next-line no-restricted-syntax
    for (const [selector, regex] of BYLINE_SELECTORS_RE) {
      const node = $(selector);
      if (node.length === 1) {
        const text = node.text();
        if (regex.test(text)) {
          return cleanAuthor(text);
        }
      }
    }

    return null;
  },
};

export default GenericAuthorExtractor;
