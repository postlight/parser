import GenericExtractor from '../generic'
import { stripTags } from '../utils'

const CustomExtractor = {
  extract(Extractor=GenericExtractor, url, html, $) {
    if (Extractor.domain === '*') return Extractor.parse(url, html, $)
    const meta = []

    const title =
      select($, Extractor.title) ||
      GenericExtractor.title($, url, meta)

    const datePublished =
      select($, Extractor.datePublished) ||
      GenericExtractor.datePublished($, url, meta)

    const author =
      select($, Extractor.author) ||
      GenericExtractor.author($, meta)

    const content =
      select($, Extractor.content, true) ||
      GenericExtractor.content($, html, {}, title)

    const leadImageUrl =
      select($, Extractor.leadImageUrl) ||
      GenericExtractor.leadImageUrl($, content, meta)

    const dek =
      select($, Extractor.dek) ||
      GenericExtractor.dek($, content, meta)

      return {
        title,
        content,
        datePublished,
        leadImageUrl,
        dek,
      }
  }
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
