import {
  CANDIDATES_WHITELIST,
  CANDIDATES_BLACKLIST,
  UNLIKELY_RE,
} from '../constants'

// ## NOTES:
// This is a working first pass, but if/when we start optimizing
// this is a good candidate.

export default function stripUnlikelyCandidates($) {
  //  Loop through the provided document and remove any non-link nodes
  //  that are unlikely candidates for article content.
  //
  //  Links are ignored because there are very often links to content
  //  that are identified as non-body-content, but may be inside
  //  article-like content.
  //
  //  :param $: a cheerio object to strip nodes from
  //  :return $: the cleaned cheerio object
  $('*').not('a').each(function(index, element) {
    const classes = $(element).attr('class')
    const id = $(element).attr('id')
    if (!id && !classes) {
      return
    } else {
      const classAndId = `${classes || ''} ${id || ''}`
      if (CANDIDATES_WHITELIST.test(classAndId)) {
        return
      } else if (CANDIDATES_BLACKLIST.test(classAndId)) {
        return $(element).remove()
      }
    }
  })

  return $
}
