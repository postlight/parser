// Spacer images to be removed
export const SPACER_RE = new RegExp("trans|transparent|spacer|blank", "i")

// A list of tags to strip from the output if we encounter them.
export const STRIP_OUTPUT_TAGS = [
    'title',
    'script',
    'noscript',
    'link',
    'style',
    'hr',
    'embed',
    'iframe',
    'object',
]

// cleanAttributes
export const REMOVE_ATTRS = ['style', 'align']
export const REMOVE_ATTR_SELECTORS = REMOVE_ATTRS.map(selector => `[${selector}]`)
export const REMOVE_ATTR_LIST = REMOVE_ATTRS.join(',')
export const WHITELIST_ATTRS = ['src', 'href', 'class', 'id', 'score']
export const WHITELIST_ATTRS_RE = new RegExp(`^(${WHITELIST_ATTRS.join('|')})$`, 'i')

// removeEmpty
export const REMOVE_EMPTY_TAGS = ['p']
export const REMOVE_EMPTY_SELECTORS = REMOVE_EMPTY_TAGS.map(tag => `${tag}:empty`).join(',')

// cleanTags
export const CLEAN_CONDITIONALLY_TAGS = ['ul', 'ol', 'table', 'div'].join(',')

// cleanHeaders
const HEADER_TAGS = ['h2', 'h3', 'h4', 'h5', 'h6']
export const HEADER_TAG_LIST = HEADER_TAGS.join(',')




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
    'related',
    'remove',
    'remark',
    'rss',
    'share',
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
].join(',')

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

export const NON_TOP_CANDIDATE_TAGS_RE =
  new RegExp(`^(${NON_TOP_CANDIDATE_TAGS.join('|')})$`, 'i')

// A list of selectors that specify, very clearly, either hNews or other
// very content-specific style content, like Blogger templates.
// More examples here: http://microformats.org/wiki/blog-post-formats
export const HNEWS_CONTENT_SELECTORS = [
  ['.hentry', '.entry-content'],
  ['entry', '.entry-content'],
  ['.entry', '.entry_content'],
  ['.post', '.postbody'],
  ['.post', '.post_body'],
  ['.post', '.post-body'],
]
// export const HNEWS_CONTENT_SELECTORS = [
//     {
//         //selector: XPath('/#<{(|[contains(@class, "hentry")]/#<{(|[contains(@class, "entry-content")]'),
//         must_exist: {
//             classes: ['hentry', 'entry-content'],
//         }
//     },
//     {
//         //selector: XPath('/#<{(|[contains(@class, "entry")]/#<{(|[contains(@class, "entry-content")]'),
//         must_exist: {
//             classes: ['entry', 'entry-content'],
//         }
//     },
//     {
//         //selector: XPath('/#<{(|[contains(@class, "entry")]/#<{(|[contains(@class, "entry_content")]'),
//         must_exist: {
//             classes: ['entry', 'entry_content'],
//         }
//     },
//     {
//         //selector: XPath('/#<{(|[contains(@class, "post")]/#<{(|[contains(@class, "post-body")]'),
//         must_exist: {
//             classes: ['post', 'post-body'],
//         }
//     },
//     {
//         //selector: XPath('/#<{(|[contains(@class, "post")]/#<{(|[contains(@class, "post_body")]'),
//         must_exist: {
//             classes: ['post', 'post_body'],
//         }
//     },
//     {
//         //selector: XPath('/#<{(|[contains(@class, "post")]/#<{(|[contains(@class, "postbody")]'),
//         must_exist: {
//             classes: ['post', 'postbody'],
//         }
//     },
// ]

export const PHOTO_HINTS = [
    'figure',
    'photo',
    'image',
    'caption'
]
export const PHOTO_HINTS_RE = new RegExp(PHOTO_HINTS.join('|'), 'i')


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

// Readability publisher-specific guidelines
export const READABILITY_ASSET = new RegExp('entry-content-asset', 'i')

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
// DISABLING FOR NOW TODO AP
// export const PAGE_IN_HREF_RE = new RegExp('(page|paging|(p(a|g|ag)?(e|enum|ewanted|ing|ination)?(=|\/)(?P<pagenum>[0-9]{1,2})))', 'i')

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
export const BLOCK_LEVEL_TAGS_RE = new RegExp(`^(${BLOCK_LEVEL_TAGS.join('|')})$`, 'i')


// The removal is implemented as a blacklist and whitelist, this test finds
// blacklisted elements that aren't whitelisted. We do this all in one
// expression-both because it's only one pass, and because this skips the
// serialization for whitelisted nodes.
const candidates_blacklist = UNLIKELY_CANDIDATES_BLACKLIST.join('|')
export const CANDIDATES_BLACKLIST = new RegExp(candidates_blacklist, 'i')

const candidates_whitelist = UNLIKELY_CANDIDATES_WHITELIST.join('|')
export const CANDIDATES_WHITELIST = new RegExp(candidates_whitelist, 'i')

export const UNLIKELY_RE = new RegExp(`!(${candidates_whitelist})|(${candidates_blacklist})`, 'i')


export const PARAGRAPH_SCORE_TAGS = new RegExp('^(p|li|span|pre)$', 'i')
export const CHILD_CONTENT_TAGS = new RegExp('^(td|blockquote|ol|ul|dl)$', 'i')
export const BAD_TAGS = new RegExp('^(address|form)$', 'i')

export const HTML_OR_BODY_RE = new RegExp('^(html|body)$', 'i')
