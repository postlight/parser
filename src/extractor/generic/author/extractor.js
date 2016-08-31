import {
  AUTHOR_META_TAGS,
  AUTHOR_MAX_LENGTH,
  AUTHOR_SELECTORS,
  BYLINE_SELECTORS_RE,
} from './constants'

import cleanAuthor from './clean-author'

import {
  extractFromMeta,
  extractFromSelectors
} from '../utils'

const GenericAuthorExtractor = {
  extract($, cachedMeta) {
    let author

    // First, check to see if we have a matching
    // meta tag that we can make use of.
    author = extractFromMeta($, AUTHOR_META_TAGS, cachedMeta)
    if (author && author.length < AUTHOR_MAX_LENGTH) {
      return cleanAuthor(author)
    }

    // Second, look through our selectors looking for potential authors.
    author = extractFromSelectors($, AUTHOR_SELECTORS, 2)
    if (author && author.length < AUTHOR_MAX_LENGTH) {
      return cleanAuthor(author)
    }

    // Last, use our looser regular-expression based selectors for
    // potential authors.
    for (const [selector, regex] of BYLINE_SELECTORS_RE) {
      const node = $(selector)
      if (node.length === 1) {
        const text = node.text()
        if (regex.test(text)) {
          return cleanAuthor(text)
        }
      }
    }

    return null
  }
}
    // def extract_author(self):
    //     # Second, use our looser regular-expression based selectors for
    //     # potential authors. These are more often bylines, and as a result
    //     # contain more links, so max_children is higher.
    //     author = self.extract_from_selectors('author',
    //                                           constants.AUTHOR_SELECTORS_RE,
    //                                           use_re = True,
    //                                           max_children = 5)
    //     if author and len(author) < constants.AUTHOR_MAX_LENGTH:
    //         return author
    //
    //     return None

export default GenericAuthorExtractor

