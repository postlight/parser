import fs from 'fs'

import Resource from 'resource'
import getExtractor from 'extractors/get-extractor'
import RootExtractor from 'extractors/root-extractor'

const Iris = {
  parse: async function(url, html) {
    const $ = await Resource.create(url, html)
    html = $.html()

    const Extractor = getExtractor(url)
    console.log(`Using extractor for ${Extractor.domain}`)

    // Cached value of every meta name in our document.
    // Used when extracting title/author/date_published/dek
    const metaCache = $('meta').map((_, node) => {
      return $(node).attr('name')
    }).toArray()

    const result = RootExtractor.extract(Extractor, { url, html, $, metaCache })
    return result
  }
}

export default Iris
