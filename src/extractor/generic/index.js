import cheerio from 'cheerio'

import GenericContentExtractor from './content/extractor'
import GenericTitleExtractor from './title/extractor'

const GenericExtractor = {
  parse: (html) => {
    let $ = cheerio.load(html)
    // Cached value of every meta name in our document.
    // Used when extracting title/author/date_published/dek
    const metaCache = $('meta').map((index, node) => $(node).attr('name'))

    const title = GenericTitleExtractor.extract($, metaCache)
    return {
      content: GenericContentExtractor.parse(html),
      title: title,
    }
  }
}

export default GenericExtractor

