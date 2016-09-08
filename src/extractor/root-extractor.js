import 'babel-polyfill'

import GenericExtractor from './generic'
import { convertNodeTo, stripTags } from './utils/dom'

const RootExtractor = {
  extract(extractor=GenericExtractor, opts) {
    const { $ } = opts
    // This is the generic extractor. Run its extract method
    if (extractor.domain === '*') return extractor.extract(opts)

    opts = {
      ...opts,
      extractor
    }

    const title = extract({ ...opts, type: 'title' })
    const datePublished = extract({ ...opts, type: 'datePublished' })
    const author = extract({ ...opts, type: 'author' })
    const content = extract({ ...opts, type: 'content', extractHtml: true })
    const leadImageUrl = extract({ ...opts, type: 'leadImageUrl', content })
    const dek = extract({ ...opts, type: 'dek', content })

    return {
      title,
      content,
      author,
      datePublished,
      leadImageUrl,
      dek,
    }
  }
}

function extract(opts) {
  const { type, extractor, $, extractHtml } = opts

  // If nothing matches the selector,
  // run the Generic extraction
  return select($, extractor[type], extractHtml) ||
    GenericExtractor[type](opts)
}

function select($, extractionOpts, extractHtml=false) {
  // Skip if there's not extraction for this type
  if (!extractionOpts) return

  // If a string is hardcoded for a type (e.g., Wikipedia
  // contributors), return the string
  if (typeof extractionOpts === 'string') return extractionOpts

  const { selectors } = extractionOpts

  const matchingSelector = selectors.find((selector) => {
    return $(selector).length === 1
  })

  if (!matchingSelector) return

  // If the selector type requests html as its return type
  // transform and clean the element with provided selectors
  if (extractHtml) {
    let $content = $(matchingSelector)

    // Wrap in div so transformation can take place on root element
    $content.wrap($('<div></div>'))
    $content = $content.parent()

    $content = transformElements($content, $, extractionOpts)
    $content = cleanBySelectors($content, $, extractionOpts)

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
        const result = value($(node), $)
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
