// An ordered list of meta tag names that denote likely article authors. All
// attributes should be lowercase for faster case-insensitive matching. From
// most distinct to least distinct.
//
// Note: "author" is too often the -developer- of the page, so it is not
// added here.
export const AUTHOR_META_TAGS = [
  'byl',
  'clmst',
  'dc.author',
  'dcsext.author',
  'dc.creator',
  'rbauthors',
  'authors',
];

export const AUTHOR_MAX_LENGTH = 300;

// An ordered list of XPath Selectors to find likely article authors. From
// most explicit to least explicit.
//
// Note - this does not use classes like CSS. This checks to see if the string
// exists in the className, which is not as accurate as .className (which
// splits on spaces/endlines), but for our purposes it's close enough. The
// speed tradeoff is worth the accuracy hit.
export const AUTHOR_SELECTORS = [
  '.entry .entry-author',
  '.author.vcard .fn',
  '.author .vcard .fn',
  '.byline.vcard .fn',
  '.byline .vcard .fn',
  '.byline .by .author',
  '.byline .by',
  '.byline .author',
  '.post-author.vcard',
  '.post-author .vcard',
  'a[rel=author]',
  '#by_author',
  '.by_author',
  '#entryAuthor',
  '.entryAuthor',
  '.byline a[href*=author]',
  '#author .authorname',
  '.author .authorname',
  '#author',
  '.author',
  '.articleauthor',
  '.ArticleAuthor',
  '.byline',
];

// An ordered list of Selectors to find likely article authors, with
// regular expression for content.
const bylineRe = /^[\n\s]*By/i;
export const BYLINE_SELECTORS_RE = [
  ['#byline', bylineRe],
  ['.byline', bylineRe],
];
