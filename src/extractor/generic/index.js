import cheerio from 'cheerio'

import GenericContentExtractor from './content/extractor'
import GenericTitleExtractor from './title/extractor'

const GenericExtractor = {
  parse: (url, html) => {
    if (html) {
      let $ = cheerio.load(html)
    } else {
      // TODO
      // Fetch link, following redirects
      // to return html and initialize $
    }

    // Cached value of every meta name in our document.
    // Used when extracting title/author/date_published/dek
    const metaCache = $('meta').map((index, node) => {
      return $(node).attr('name')
    }).toArray()

    const title = GenericTitleExtractor.extract($, url, metaCache)
    return {
      content: GenericContentExtractor.parse($, html),
      title: title,
    }
  }
}

export default GenericExtractor

