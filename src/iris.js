import fs from 'fs'

import Resource from 'resource'
import getExtractor from 'extractors/get-extractor'
import RootExtractor from 'extractors/root-extractor'
import { removeAnchor } from 'utils/text'

const Iris = {
  parse: async function(url, html, opts={}) {
    const { fetchAllPages=true } = opts || true
    let $ = await Resource.create(url, html)
    html = $.html()

    const Extractor = getExtractor(url)
    console.log(`Using extractor for ${Extractor.domain}`)

    // Cached value of every meta name in our document.
    // Used when extracting title/author/date_published/dek
    const metaCache = $('meta').map((_, node) => {
      return $(node).attr('name')
    }).toArray()

    let extractorOpts = { url, html, $, metaCache }
    let result = RootExtractor.extract(Extractor, extractorOpts)
    let { nextPageUrl, title } = result

    if (fetchAllPages && nextPageUrl) {
      result = await collectAllPages({ nextPageUrl, html, $, metaCache, result, Extractor, title, url })
    }

    return result
  }
}

async function collectAllPages({
  nextPageUrl,
  html,
  $,
  metaCache,
  result,
  Extractor,
  title,
  url
}) {
  let pages = 2
  let previousUrls = [removeAnchor(url)]
  while (nextPageUrl && pages < 26) {
    $ = await Resource.create(nextPageUrl)
    html = $.html()
    let extractorOpts = { url: nextPageUrl, html, $, metaCache }
    let nextPageResult = RootExtractor.extract(
      Extractor,
      {
        ...extractorOpts,
        url: nextPageUrl,
        contentOnly: true,
        extractedTitle: title,
        previousUrls
      }
    )

    previousUrls.push(nextPageUrl)
    result = {
      ...result,
      content: `
        ${result.content}
        <hr>
        <h4>Page ${pages}</h4>
        ${nextPageResult.content}
        `
    }

    nextPageUrl = nextPageResult.nextPageUrl

    pages = pages + 1
  }
  return result
}

export default Iris
