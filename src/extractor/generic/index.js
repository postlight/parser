import cheerio from 'cheerio'

import GenericContentExtractor from './content/extractor'
import GenericTitleExtractor from './title/extractor'
import GenericAuthorExtractor from './author/extractor'
import GenericDatePublishedExtractor from './date-published/extractor'

const GenericExtractor = {
  parse: (url, html) => {
    let $
    if (html) {
      $ = cheerio.load(html)
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
      title: title,
      author: GenericAuthorExtractor.extract($, metaCache),
      datePublished: GenericDatePublishedExtractor.extract($, url, metaCache),
      content: GenericContentExtractor.parse($, html),
    }
  }
}

export default GenericExtractor

