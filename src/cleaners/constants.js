// CLEAN AUTHOR CONSTANTS
export const CLEAN_AUTHOR_RE = /^\s*(posted |written )?by\s*:?\s*(.*)/i
    //     author = re.sub(r'^\s*(posted |written )?by\s*:?\s*(.*)(?i)',

// CLEAN DEK CONSTANTS
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

// CLEAN DATE PUBLISHED CONSTANTS
export const CLEAN_DATE_STRING_RE = /^\s*published\s*:?\s*(.*)/i
export const TIME_MERIDIAN_SPACE_RE = /(.*\d)(am|pm)(.*)/i
export const TIME_MERIDIAN_DOTS_RE = /\.m\./i
export const SPLIT_DATE_STRING = /(\d{1,2}:\d{2,2}(\s?[ap]\.?m\.?)?)|(\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4})|(\d{1,4})|(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/ig

// CLEAN TITLE CONSTANTS
// A regular expression that will match separating characters on a
// title, that usually denote breadcrumbs or something similar.
export const TITLE_SPLITTERS_RE = /(: | - | \| )/g

export const DOMAIN_ENDINGS_RE =
  new RegExp('\.com$|\.net$|\.org$|\.co\.uk$', 'g')
