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
]

// og:title is weak because it typically contains context that we don't like,
// for example the source site's name. Gotta get that brand into facebook!
export const WEAK_TITLE_META_TAGS = [
    'og:title',
]

// An ordered list of XPath Selectors to find likely article titles. From
// most explicit to least explicit.
//
// Note - this does not use classes like CSS. This checks to see if the string
// exists in the className, which is not as accurate as .className (which 
// splits on spaces/endlines), but for our purposes it's close enough. The
// speed tradeoff is worth the accuracy hit.
export const STRONG_TITLE_SELECTORS = [
    {
        //selector: XPath('//*[contains(@class, "hentry")]//*[contains(@class, "entry-title")]'),
        must_exist: {
            classes: ['hentry', 'entry-title'],
        }
    }, 
    {
        //selector: XPath('//*[id="articleHeader"]//h1'),
        must_exist: {
            'ids': ['articleHeader']
        }
    },
    {
        //selector: XPath('//*[contains(@class, "articleHeader")]/h1'),
        must_exist: {
            classes: ['articleHeader'],
        }
    },
    {
        //selector: XPath('//*[contains(@class, "article")]/h1'),
        must_exist: {
            classes: ['article'],
        }
    },
    {
        //selector: XPath('//*[contains(@class, "instapaper_title")]'),
        must_exist: {
            classes: ['instapaper_title'],
        }
    },
    {
        //selector: XPath('//*[@id="meebo-title"]'),
        must_exist: {
            'ids': ['meebo-title']
        }
    },
]

export const WEAK_TITLE_SELECTORS = [
    {
        //selector: XPath('//article//h1'),
        must_exist: {
            classes: [],
            'ids': []
        }
    },
    {
        //selector: XPath('//*[id="entry-title"]'),
        must_exist: {
            'ids': ['entry-title']
        }
    },
    {
        //selector: XPath('//*[contains(@class, "entry-title")]'),
        must_exist: {
            classes: ['entry-title'],
        }
    },
    {
        //selector: XPath('//*[id="entryTitle" or id="entrytitle"]'),
        must_exist: {
            'ids': ['entryTitle'],
        }
    },
    {
        //selector: XPath('//*[id="entrytitle"]'),
        must_exist: {
            'ids': ['entrytitle'],
        }
    },
    {
        //selector: XPath('//*[contains(@class, "entryTitle")]'),
        must_exist: {
            classes: ['entryTitle'],
        }
    },
    {
        //selector: XPath('//*[contains(@class, "entrytitle")]'),
        must_exist: {
            classes: ['entrytitle'],
        }
    },
    {
        //selector: XPath('//*[id="articleTitle"]'),
        must_exist: {
            'ids': ['articleTitle'],
        }
    },
    {
        //selector: XPath('//*[contains(@class, "articleTitle")]'),
        must_exist: {
            classes: ['articleTitle'],
        }
    },
    {
        //selector: XPath('//*[contains(@class, "post")]//*[contains(@class, "post-title")]'),
        must_exist: {
            classes: ['post', 'post-title'],
        }
    },
    {
        //selector: XPath('//h1[contains(@class, "title")]'),
    },
    {
        //selector: XPath('//*[contains(@class, "article")]//h2'),
        must_exist: {
            classes: ['article'],
            'ids': []
        }
    },
    {
        //selector: XPath('//h1'),
    },
    {
        //selector: XPath('//html//head//title'),
    },
    {
        //selector: XPath('//title'),
    },
]


// A regular expression that will match separating characters on a title, that
// usually denote breadcrumbs or something similar.
export const TITLE_SPLITTERS_RE = new RegExp('(: | - | \| )')


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
]

export const AUTHOR_MAX_LENGTH = 300

// An ordered list of XPath Selectors to find likely article authors. From
// most explicit to least explicit.
//
// Note - this does not use classes like CSS. This checks to see if the string
// exists in the className, which is not as accurate as .className (which 
// splits on spaces/endlines), but for our purposes it's close enough. The
// speed tradeoff is worth the accuracy hit.
export const AUTHOR_SELECTORS = [
    {
        //selector: XPath('//*[contains(@class, "entry")]//*[contains(@class, "entry-author")]'),
        must_exist: {
            classes: ['entry', 'entry-author'],
        }
    }, 
    {
        //selector: XPath('//*[contains(@class, "author") and contains(@class, "vcard")]//*[contains(@class, "fn")]'),
        must_exist: {
            classes: ['author', 'vcard', 'fn'],
        }
    },
    {
        //selector: XPath('//*[contains(@class, "author")]//*[contains(@class, "vcard")]//*[contains(@class, "fn")]'),
        must_exist: {
            classes: ['author', 'vcard', 'fn'],
        }
    },
    {
        //selector: XPath('//*[contains(@class, "byline") and contains(@class, "vcard")]//*[contains(@class, "fn")]'),
        must_exist: {
            classes: ['byline', 'vcard', 'fn'],
        }
    },
    {
        //selector: XPath('//*[contains(@class, "byline")]//*[contains(@class, "vcard")]//*[contains(@class, "fn")]'),
        must_exist: {
            classes: ['byline', 'vcard', 'fn'],
        }
    },
    {
        //selector: XPath('//*[contains(@class, "byline")]//*[contains(@class, "by")]//*[contains(@class, "author")]'),
        must_exist: {
            classes: ['byline', 'by', 'author'],
        }
    },
    {
        //selector: XPath('//*[contains(@class, "byline")]//*[contains(@class, "by")]'),
        must_exist: {
            classes: ['byline', 'by'],
        }
    },
    {
        //selector: XPath('//*[contains(@class, "byline")]//*[contains(@class, "author")]'),
        must_exist: {
            classes: ['byline', 'author'],
        }
    },
    {
        //selector: XPath('//*[contains(@class, "post-author") and contains(@class, "vcard")]'),
        must_exist: {
            classes: ['post-author', 'vcard'],
        }
    },
    {
        //selector: XPath('//*[contains(@class, "post-author")]//*[contains(@class, "vcard")]'),
        must_exist: {
            classes: ['post-author', 'vcard'],
        }
    },
    {
        //selector: XPath('//a[contains(@rel, "author")]'),
    },
    {
        //selector: XPath('//*[@id="by_author"]'),
        must_exist: {
            'ids': ['by_author']
        }
    },
    {
        //selector: XPath('//*[contains(@class, "by_author")]'),
        must_exist: {
            classes: ['by_author'],
        }
    },
    {
        //selector: XPath('//*[@id="entryAuthor"]'),
        must_exist: {
            'ids': ['entryAuthor']
        }
    },
    {
        //selector: XPath('//*[contains(@class, "entryAuthor")]'),
        must_exist: {
            classes: ['entryAuthor'],
        }
    },
    {
        //selector: XPath('//*[contains(@class, "byline")]//a[contains(@href, "author")]'),
        must_exist: {
            classes: ['byline'],
        }
    },
    {
        //selector: XPath('//*[@id="author"]//*[contains(@class, "authorname")]'),
        must_exist: {
            classes: ['authorname'],
            'ids': ['author']
        }
    },
    {
        //selector: XPath('//*[contains(@class, "author")]//*[contains(@class, "authorname")]'),
        must_exist: {
            classes: ['author', 'authorName'],
        }
    },
    {
        //selector: XPath('//*[@id="author"]'),
        must_exist: {
            'ids': ['author']
        }
    },
    {
        //selector: XPath('//*[contains(@class, "author")]'),
        must_exist: {
            classes: ['author'],
        }
    },
    {
        //selector: XPath('//*[contains(@class, "articleauthor")]'),
        must_exist: {
            classes: ['articleauthor'],
        }
    },
    {
        //selector: XPath('//*[contains(@class, "ArticleAuthor")]'),
        must_exist: {
            classes: ['ArticleAuthor'],
        }
    },
]

// An ordered list of XPath Selectors to find likely article authors, with
// regular expression namespaces enabled. Its own list for performance
// considerations.
export const AUTHOR_SELECTORS_RE = [
    '//*[@id="byline"][re:test(., "^\s*By", "i")]',
    '//*[contains(@class, "byline")][re:test(., "^\s*By", "i")]',
]

// An ordered list of meta tag names that denote likely date published dates.
// All attributes should be lowercase for faster case-insensitive matching.
// From most distinct to least distinct.
export const DATE_PUBLISHED_META_TAGS = [
    'article:published_time',
    'displaydate',
    'dc.date',
    'dc.date.issued',
    'rbpubdate',
    'publish_date',
    'pub_date',
    'pagedate',
    'pubdate',
    'revision_date',
    'doc_date',
    'date_created',
    'content_create_date',
    'lastmodified',
    'created',
    'date'
]

// An ordered list of XPath Selectors to find likely date published dates. From
// most explicit to least explicit.
//
// Note - this does not use classes like CSS. This checks to see if the string
// exists in the className, which is not as accurate as .className (which 
// splits on spaces/endlines), but for our purposes it's close enough. The
// speed tradeoff is worth the accuracy hit.
export const DATE_PUBLISHED_SELECTORS = [
    {
        //selector: XPath('//*[contains(@class, "hentry")]//*[contains(@class, "dtstamp.published")]'),
        must_exist: {
            classes: ['hentry', 'dtstamp.published'],
        }
    },
    {
        //selector: XPath('//*[contains(@class, "hentry")]//*[contains(@class, "published")]'),
        must_exist: {
            classes: ['hentry', 'published'],
        }
    },
    {
        //selector: XPath('//*[contains(@class, "hentry")]//*[contains(@class, "dtstamp.updated")]'),
        must_exist: {
            classes: ['hentry', 'dtstamp.updated'],
        }
    },
    {
        //selector: XPath('//*[contains(@class, "hentry")]//*[contains(@class, "updated")]'),
        must_exist: {
            classes: ['hentry', 'updated'],
        }
    },
    {
        //selector: XPath('//*[contains(@class, "single")]//*[contains(@class, "published")]'),
        must_exist: {
            classes: ['single', 'published'],
        }
    },
    {
        //selector: XPath('//*[contains(@class, "meta")]//*[contains(@class, "published")]'),
        must_exist: {
            classes: [],
            'ids': []
        }
    },
    {
        //selector: XPath('//*[contains(@class, "meta")]//*[contains(@class, "postDate")]'),
        must_exist: {
            classes: ['meta', 'posDate'],
        }
    },
    {
        //selector: XPath('//*[contains(@class, "entry-date")]'),
        must_exist: {
            classes: ['entry-date'],
        }
    },
    {
        //selector: XPath('//*[contains(@class, "byline")]//*[contains(@class, "date")]'),
        must_exist: {
            classes: ['byline', 'date'],
        }
    },
    {
        //selector: XPath('//*[contains(@class, "postmetadata")]//*[contains(@class, "date")]'),
        must_exist: {
            classes: ['postmetadata', 'date'],
        }
    },
    {
        //selector: XPath('//*[contains(@class, "article_datetime")]'),
        must_exist: {
            classes: ['article_datetime'],
        }
    },
    {
        //selector: XPath('//*[contains(@class, "date-header")]'),
        must_exist: {
            classes: ['date-header'],
        }
    },
    {
        //selector: XPath('//*[contains(@class, "story-date")]'),
        must_exist: {
            classes: ['story-date'],
        }
    },
    {
        //selector: XPath('//*[contains(@class, "dateStamp")]'),
        must_exist: {
            classes: ['dateStamp'],
        }
    },
    {
        //selector: XPath('//*[@id="story"]//*[contains(@class, "datetime")]'),
        must_exist: {
            classes: ['datetime'],
            'ids': ['story']
        }
    },
    {
        //selector: XPath('//*[contains(@class, "dateline")]'),
        must_exist: {
            classes: ['dateline'],
        }
    },
    {
        //selector: XPath('//*[contains(@class, "pubdate")]'),
        must_exist: {
            classes: ['pubdate'],
        }
    },
]


// An ordered list of compiled regular expressions to find likely date
// published dates from the URL. These should always have the first
// reference be a date string that is parseable by dateutil.parser.parse
const _abbrev_months_str = '(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)'
export const DATE_PUBLISHED_URL_RES = [
    new RegExp('/(20\d{2}/\d{2}/\d{2})/', 'i'),                    // /2012/01/27/ but not /2012/01/293
    new RegExp('[^0-9](20\d{2}[01]\d[0-3]\d)([^0-9]|$)', 'i'),     // 20120127 or 20120127T but not 2012012733 or 8201201733
    new RegExp('(20\d{2}-[01]\d-[0-3]\d)', 'i'),                   // 2012-01-27
    new RegExp('/(20\d{2}/%s/[0-3]\d)/' % _abbrev_months_str, 'i') // /2012/jan/27/

]


// An ordered list of meta tag names that denote likely article deks. All
// attributes should be lowercase for faster case-insensitive matching. From
// most distinct to least distinct.
//
// NOTE: There are currently no meta tags that seem to provide the right
// content consistenty enough. Two options were:
//  - og:description
//  - dc.description
// However, these tags often have SEO-specific junk in them that's not
// header-worthy like a dek is. Excerpt material at best.
export const DEK_META_TAGS = [
]

// An ordered list of XPath Selectors to find likely article deks. From
// most explicit to least explicit.
//
// Note - this does not use classes like CSS. This checks to see if the string
// exists in the className, which is not as accurate as .className (which 
// splits on spaces/endlines), but for our purposes it's close enough. The
// speed tradeoff is worth the accuracy hit.
//
// Should be more restrictive than not, as a failed dek can be pretty
// detrimental to the aesthetics of an article.
export const DEK_SELECTORS = [
    {
        //selector: XPath('//*[contains(@class, "entry-summary")]'),
        must_exist: {
            classes: ['entry-summary'],
        }
    }, // hentry microformat
]



// An ordered list of meta tag names that denote likely article leading images.
// All attributes should be lowercase for faster case-insensitive matching.
// From most distinct to least distinct.
export const LEAD_IMAGE_URL_META_TAGS = [
    //'og:image',
    'image_src',
]

// An ordered list of XPath Selectors to find likely article deks. From
// most explicit to least explicit.
//
// Should be more restrictive than not, as a failed dek can be pretty
// detrimental to the aesthetics of an article.
export const LEAD_IMAGE_URL_SELECTORS = [
    {
        //selector: '//link[@rel="image_src"]',
    }, // hentry microformat
]


//// CONTENT FETCHING CONSTANTS ////

// A list of strings that can be considered unlikely candidates when
// extracting content from a resource. These strings are joined together
// and then tested for existence using re:test, so may contain simple,
// non-pipe style regular expression queries if necessary.
export const UNLIKELY_CANDIDATES_BLACKLIST = [
    'ad-break',
    'adbox',
    'advert',
    'addthis',
    'agegate',
    'aux',
    'blogger-labels',
    'combx',
    'comment',
    'conversation',
    'disqus',
    'entry-unrelated',
    'extra',
    'foot',
    'form',
    'header',
    'hidden',
    'loader',
    'login',                     // Note: This can hit 'blogindex'.
    'menu',
    'meta',
    'nav',
    'pager',
    'pagination',
    'predicta',                  // readwriteweb inline ad box
    'presence_control_external', // lifehacker.com container full of false positives
    'popup',
    'printfriendly',
    'remove',
    'remark',
    'rss',
    'shoutbox',
    'sidebar',
    'sociable',
    'sponsor',
    'tools'
]

// A list of strings that can be considered LIKELY candidates when
// extracting content from a resource. Essentially, the inverse of the
// blacklist above - if something matches both blacklist and whitelist,
// it is kept. This is useful, for example, if something has a className
// of "rss-content entry-content". It matched 'rss', so it would normally
// be removed, however, it's also the entry content, so it should be left
// alone.
//
// These strings are joined together and then tested for existence using
// re:test, so may contain simple, non-pipe style regular expression queries
// if necessary.
export const UNLIKELY_CANDIDATES_WHITELIST = [
    'and',
    'article',
    'body',
    'blogindex',
    'column',
    'content',
    'entry-content-asset',
    'format', // misuse of form
    'hfeed',
    'hentry',
    'hatom',
    'main',
    'page',
    'posts',
    'shadow'
]

// A list of tags which, if found inside, should cause a <div /> to NOT
// be turned into a paragraph tag. Shallow div tags without these elements
// should be turned into <p /> tags.
export const DIV_TO_P_BLOCK_TAGS = [
    'a',
    'blockquote',
    'dl',
    'div',
    'img',
    'p',
    'pre',
    'table',
]

// A list of tags that should be ignored when trying to find the top candidate
// for a document.
export const NON_TOP_CANDIDATE_TAGS = [
    'br',
    'b',
    'i',
    'label',
    'hr',
    'area',
    'base',
    'basefont',
    'input',
    'img',
    'link',
    'meta',
]


// A list of selectors that specify, very clearly, either hNews or other
// very content-specific style content, like Blogger templates.
// More examples here: http://microformats.org/wiki/blog-post-formats
export const HNEWS_CONTENT_SELECTORS = [
    {
        //selector: XPath('//*[contains(@class, "hentry")]//*[contains(@class, "entry-content")]'),
        must_exist: {
            classes: ['hentry', 'entry-content'],
        }
    },
    {
        //selector: XPath('//*[contains(@class, "entry")]//*[contains(@class, "entry-content")]'),
        must_exist: {
            classes: ['entry', 'entry-content'],
        }
    },
    {
        //selector: XPath('//*[contains(@class, "entry")]//*[contains(@class, "entry_content")]'),
        must_exist: {
            classes: ['entry', 'entry_content'],
        }
    },
    {
        //selector: XPath('//*[contains(@class, "post")]//*[contains(@class, "post-body")]'),
        must_exist: {
            classes: ['post', 'post-body'],
        }
    },
    {
        //selector: XPath('//*[contains(@class, "post")]//*[contains(@class, "post_body")]'),
        must_exist: {
            classes: ['post', 'post_body'],
        }
    },
    {
        //selector: XPath('//*[contains(@class, "post")]//*[contains(@class, "postbody")]'),
        must_exist: {
            classes: ['post', 'postbody'],
        }
    },
]

export const PHOTO_HINTS = [
    'figure',
    'photo',
    'image',
    'caption'
]
export const PHOTO_HINTS_RE = new RegExp(PHOTO_HINTS.join('|'), 'i')

export const POSITIVE_LEAD_IMAGE_URL_HINTS = [
    'upload',
    'wp-content',
    'large',
    'photo',
    'wp-image',
]
export const POSITIVE_LEAD_IMAGE_URL_HINTS_RE = new RegExp(POSITIVE_LEAD_IMAGE_URL_HINTS.join('|'), 'i')

export const NEGATIVE_LEAD_IMAGE_URL_HINTS = [
    'spacer',
    'sprite',
    'blank',
    'throbber',
    'gradient',
    'tile',
    'bg',
    'background',
    'icon',
    'social',
    'header',
    'hdr',
    'advert',
    'spinner',
    'loader',
    'loading',
    'default',
    'rating',
    'share',
    'facebook',
    'twitter',
    'theme',
    'promo',
    'ads',
    'wp-includes',
]
export const NEGATIVE_LEAD_IMAGE_URL_HINTS_RE = new RegExp(NEGATIVE_LEAD_IMAGE_URL_HINTS.join('|'), 'i')

// A list of strings that denote a positive scoring for this content as being
// an article container. Checked against className and id.
//
// TODO: Perhaps have these scale based on their odds of being quality?
export const POSITIVE_SCORE_HINTS = [
    'article', 
    'articlecontent',
    'instapaper_body',
    'blog',
    'body',
    'content',
    'entry-content-asset',
    'entry',
    'hentry',
    'main',
    'Normal',
    'page',
    'pagination',
    'permalink',
    'post',
    'story',
    'text',
    '[-_]copy', //usatoday
    '\Bcopy'
]

// The above list, joined into a matching regular expression
export const POSITIVE_SCORE_RE = new RegExp(POSITIVE_SCORE_HINTS.join('|'), 'i')


// A list of strings that denote a negative scoring for this content as being
// an article container. Checked against className and id.
//
// TODO: Perhaps have these scale based on their odds of being quality?
export const NEGATIVE_SCORE_HINTS = [
    'adbox',
    'advert',
    'author',
    'bio',
    'bookmark',
    'bottom',
    'byline',
    'clear',
    'com-',
    'combx',
    'comment',
    'comment\B',
    'contact',
    'copy',
    'credit',
    'crumb',
    'date',
    'deck',
    'excerpt',
    'featured', //tnr.com has a featured_content which throws us off
    'foot',
    'footer',
    'footnote',
    'graf',
    'head',
    'info',
    'infotext', //newscientist.com copyright
    'instapaper_ignore',
    'jump',
    'linebreak',
    'link',
    'masthead',
    'media',
    'meta',
    'modal',
    'outbrain', //slate.com junk
    'promo',
    'pr_', // autoblog - press release
    'related',
    'respond',
    'roundcontent', //lifehacker restricted content warning
    'scroll',
    'secondary',
    'share',
    'shopping',
    'shoutbox',
    'side',
    'sidebar',
    'sponsor',
    'stamp',
    'sub',
    'summary',
    'tags',
    'tools',
    'widget'
]
// The above list, joined into a matching regular expression
export const NEGATIVE_SCORE_RE = new RegExp(NEGATIVE_SCORE_HINTS.join('|'), 'i')

// A list of tags to strip from the output if we encounter them.
export const STRIP_OUTPUT_TAGS = [
    'title',
    'script',
    'noscript',
    'link',
    'style',
    'hr',
]

// XPath to try to determine if a page is wordpress. Not always successful.
export const IS_WP_XPATH = "//meta[@name='generator'][starts-with(@value,'WordPress')]"

// Match a digit. Pretty clear.
export const DIGIT_RE = new RegExp('[0-9]')

// A list of words that, if found in link text or URLs, likely mean that
// this link is not a next page link.
export const EXTRANEOUS_LINK_HINTS = [
    'print',
    'archive',
    'comment',
    'discuss',
    'e-mail',
    'email',
    'share',
    'reply',
    'all',
    'login',
    'sign',
    'single',
    'adx',
    'entry-unrelated'
]
export const EXTRANEOUS_LINK_HINTS_RE = new RegExp(EXTRANEOUS_LINK_HINTS.join('|'), 'i')

// An expression that looks to try to find the page digit within a URL, if
// it exists.
// Matches:
//  page=1
//  pg=1
//  p=1
//  paging=12
//  pag=7
//  pagination/1
//  paging/88
//  pa/83
//  p/11
//
// Does not match:
//  pg=102
//  page:2
export const PAGE_IN_HREF_RE = new RegExp('(page|paging|(p(a|g|ag)?(e|enum|ewanted|ing|ination)?(=|\/)(?P<pagenum>[0-9]{1,2})))', 'i')

// Match any phrase that looks like it could be page, or paging, or pagination
export const PAGE_RE = new RegExp('pag(e|ing|inat)', 'i')

// Match any link text/classname/id that looks like it could mean the next
// page. Things like: next, continue, >, >>, » but not >|, »| as those can
// mean last page.
export const NEXT_LINK_TEXT_RE = new RegExp('(next|weiter|continue|>([^\|]|$)|»([^\|]|$))', 'i')

// Match any link text/classname/id that looks like it is an end link: things
// like "first", "last", "end", etc.
export const CAP_LINK_TEXT_RE = new RegExp('(first|last|end)', 'i')

// Match any link text/classname/id that looks like it means the previous
// page.
export const PREV_LINK_TEXT_RE = new RegExp('(prev|earl|old|new|<|«)', 'i')

// Match 2 or more consecutive <br> tags
export const BR_TAGS_RE = new RegExp('(<br[^>]*>[ \n\r\t]*){2,}', 'i')

// Match 1 BR tag.
export const BR_TAG_RE = new RegExp('<br[^>]*>', 'i')

// A list of all of the block level tags known in HTML5 and below. Taken from
// http://bit.ly/qneNIT
export const BLOCK_LEVEL_TAGS = [
    'article',
    'aside',
    'blockquote',
    'body',
    'br',
    'button',
    'canvas',
    'caption',
    'col',
    'colgroup',
    'dd',
    'div',
    'dl',
    'dt',
    'embed',
    'fieldset',
    'figcaption',
    'figure',
    'footer',
    'form',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'header',
    'hgroup',
    'hr',
    'li',
    'map',
    'object',
    'ol',
    'output',
    'p',
    'pre',
    'progress',
    'section',
    'table',
    'tbody',
    'textarea',
    'tfoot',
    'th',
    'thead',
    'tr',
    'ul',
    'video',
]
