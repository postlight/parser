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
    'object',
]

// cleanAttributes
export const REMOVE_ATTRS = ['style', 'align']
export const REMOVE_ATTR_SELECTORS = REMOVE_ATTRS.map(selector => `[${selector}]`)
export const REMOVE_ATTR_LIST = REMOVE_ATTRS.join(',')

// removeEmpty
export const REMOVE_EMPTY_TAGS = ['p']
export const REMOVE_EMPTY_SELECTORS = REMOVE_EMPTY_TAGS.map(tag => `${tag}:empty`).join(',')

// cleanTags
export const CLEAN_CONDITIONALLY_TAGS = ['ul', 'ol', 'table', 'div'].join(',')

// cleanHeaders
const HEADER_TAGS = ['h2', 'h3', 'h4', 'h5', 'h6']
export const HEADER_TAG_LIST = HEADER_TAGS.join(',')
