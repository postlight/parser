import 'babel-polyfill'

import GenericExtractor from './generic'
import { convertNodeTo, stripTags } from './utils/dom'

const RootExtractor = {
  extract(extractor=GenericExtractor, opts) {
    const { $ } = opts
    // This is the generic extractor. Run its extract method
    if (extractor.domain === '*') return extractor.extract(opts)

    const title = extract({ ...opts, type: 'title', extractor })
    const datePublished = extract({ ...opts, type: 'datePublished', extractor })
    const author = extract({ ...opts, type: 'author', extractor })
    const content = extract({ ...opts, type: 'content', extractor, html: true })
    const leadImageUrl = extract({ ...opts, type: 'leadImageUrl', extractor })
    const dek = extract({ ...opts, type: 'dek', extractor })

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
  const { type, extractor, $, html } = opts

  // If nothing matches the selector,
  // run the Generic extraction
  return select($, extractor[type], html) ||
    GenericExtractor[type](opts)
}

function select($, extractionOpts, html=false) {
  // Skip if there's not extraction for this type
  if (!extractionOpts) return

  const { selectors } = extractionOpts

  const matchingSelector = selectors.find((selector) => {
    return $(selector).length === 1
  })
  if (!matchingSelector) return

  // If the selector type requests html as its return type
  // clean the element with provided cleaning selectors
  if (html) {
    let $content = $(matchingSelector)
    $content = cleanBySelectors($content, $, extractionOpts)
    $content = transformElements($content, $, extractionOpts)

    return $.html($content)
  } else {
    return stripTags($(matchingSelector).text(), $)
  }
}

// Remove elements by an array of selectors
export function cleanBySelectors($content, $, { clean }) {
  if (!clean) return

  $(clean.join(','), $content).remove()

  return $content
}

// Transform matching elements
export function transformElements($content, $, { transforms }) {
  if (!transforms) return

  Reflect.ownKeys(transforms).forEach((key) => {
    const $matches = $(key, $content)
    const value = transforms[key]

    // If value is a string, convert directly
    if (typeof value === 'string') {
      $matches.each((index, node) => {
        convertNodeTo(node, $, transforms[key])
      })
    } else if (typeof value === 'function') {
      // If value is function, apply function to node
      $matches.each((index, node) => {
        const result = value($(node))
        // If function returns a string, convert node to that value
        if (typeof result === 'string') {
          convertNodeTo(node, $, result)
        }
      })
    }
  })

  return $content
}

export default RootExtractor
