export const TEXT_LINK_RE = new RegExp('http(s)?://', 'i')
// An ordered list of meta tag names that denote likely article deks.
// From most distinct to least distinct.
//
// NOTE: There are currently no meta tags that seem to provide the right
// content consistenty enough. Two options were:
//  - og:description
//  - dc.description
// However, these tags often have SEO-specific junk in them that's not
// header-worthy like a dek is. Excerpt material at best.
export const DEK_META_TAGS = [
]

// An ordered list of Selectors to find likely article deks. From
// most explicit to least explicit.
//
// Should be more restrictive than not, as a failed dek can be pretty
// detrimental to the aesthetics of an article.
export const DEK_SELECTORS = [
  '.entry-summary',
]


