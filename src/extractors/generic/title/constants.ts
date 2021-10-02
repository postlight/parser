// TODO: It would be great if we could merge the meta and selector lists into
// a list of objects, because we could then rank them better. For example,
// .hentry .entry-title is far better suited than <meta title>.

// An ordered list of meta tag names that denote likely article titles. All
// attributes should be lowercase for faster case-insensitive matching. From
// most distinct to least distinct.
export const STRONG_TITLE_META_TAGS = [
  'tweetmeme-title',
  'dc.title',
  'rbtitle',
  'headline',
  'title',
];

// og:title is weak because it typically contains context that we don't like,
// for example the source site's name. Gotta get that brand into facebook!
export const WEAK_TITLE_META_TAGS = ['og:title'];

// An ordered list of XPath Selectors to find likely article titles. From
// most explicit to least explicit.
//
// Note - this does not use classes like CSS. This checks to see if the string
// exists in the className, which is not as accurate as .className (which
// splits on spaces/endlines), but for our purposes it's close enough. The
// speed tradeoff is worth the accuracy hit.
export const STRONG_TITLE_SELECTORS = [
  '.hentry .entry-title',
  'h1#articleHeader',
  'h1.articleHeader',
  'h1.article',
  '.instapaper_title',
  '#meebo-title',
];

export const WEAK_TITLE_SELECTORS = [
  'article h1',
  '#entry-title',
  '.entry-title',
  '#entryTitle',
  '#entrytitle',
  '.entryTitle',
  '.entrytitle',
  '#articleTitle',
  '.articleTitle',
  'post post-title',
  'h1.title',
  'h2.article',
  'h1',
  'html head title',
  'title',
];
