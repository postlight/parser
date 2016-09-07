import GenericExtractor from '../generic'
import { stripTags } from '../utils'

const CustomExtractor = {
  extract(extractor=GenericExtractor, opts) {
    const { $ } = opts
    if (extractor.domain === '*') return extractor.parse(opts)

    const title = extract({ ...opts, type: 'title', extractor })
    const datePublished = extract({ ...opts, type: 'datePublished', extractor })
    const author = extract({ ...opts, type: 'author', extractor })
    const content = extract({ ...opts, type: 'content', extractor, html: true })
    const leadImageUrl = extract({ ...opts, type: 'leadImageUrl', extractor, html: true })
    const dek = extract({ ...opts, type: 'dek', extractor, html: true })

    return {
      title,
      content,
      datePublished,
      leadImageUrl,
      dek,
    }
  }
}

function extract(opts) {
  const { type, extractor, $ } = opts
  return select($, extractor[type]) ||
    GenericExtractor[type](opts)
}

function select($, selectObj, html=false) {
  if (!selectObj) return
  const { selectors } = selectObj
  if (!selectors) return

  const matchingSelector = selectors.find((selector) => {
    return $(selector).length === 1
  })
  if (!matchingSelector) return

  if (html) {
    let $content = $(matchingSelector)
    $content = cleanBySelectors($content, $, selectObj)
  } else {
    return stripTags($(matchingSelector).text(), $)
  }
}

function cleanBySelectors($content, $, selectObj) {
  const { clean } = selectObj

  $(clean.join(','), $content).remove()

  return $content
}

export default CustomExtractor
