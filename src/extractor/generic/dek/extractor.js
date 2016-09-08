import {
  DEK_META_TAGS,
  DEK_SELECTORS,
  DEK_URL_RES,
} from './constants'

import { cleanDek } from '../../../cleaners'

import {
  extractFromMeta,
  extractFromSelectors,
  extractFromUrl,
} from '../utils'

// Currently there is only one selector for
// deks. We should simply return null here
// until we have a more robust generic option.
// Below is the original source for this, for reference.
const GenericDekExtractor = {
  extract({ $, content, metaCache }) {
    return null
  }
}

export default GenericDekExtractor

// def extract_dek(self):
//     # First, check to see if we have a matching meta tag that we can make
//     # use of.
//     dek = self.extract_from_meta('dek', constants.DEK_META_TAGS)
//     if not dek:
//         # Second, look through our CSS/XPath selectors. This may return
//         # an HTML fragment.
//         dek = self.extract_from_selectors('dek',
//                                            constants.DEK_SELECTORS,
//                                            text_only=False)
//
//     if dek:
//         # Make sure our dek isn't in the first few thousand characters
//         # of the content, otherwise it's just the start of the article
//         # and not a true dek.
//         content = self.extract_content()
//         content_chunk = normalize_spaces(strip_tags(content[:2000]))
//         dek_chunk = normalize_spaces(dek[:100]) # Already has no tags.
//
//         # 80% or greater similarity means the dek was very similar to some
//         # of the starting content, so we skip it.
//         if fuzz.partial_ratio(content_chunk, dek_chunk) < 80:
//             return dek
//
//     return None
