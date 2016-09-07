import cheerio from 'cheerio'

import GenericContentExtractor from './content/extractor'
import GenericTitleExtractor from './title/extractor'
import GenericAuthorExtractor from './author/extractor'
import GenericDatePublishedExtractor from './date-published/extractor'
import GenericDekExtractor from './dek/extractor'
import GenericLeadImageUrlExtractor from './lead-image-url/extractor'

const GenericExtractor = {
  // This extractor is the default for all domains
  domain: '*',

  parse: (url, html, $) => {
    if (html) {
      $ = cheerio.load(html)
    } else {
      // TODO
      // Fetch link, following redirects
      // to return html and initialize $
    }

    // Cached value of every meta name in our document.
    // Used when extracting title/author/date_published/dek
    const metaCache = $('meta').map((_, node) => {
      return $(node).attr('name')
    }).toArray()

    const title = GenericTitleExtractor.extract($, url, metaCache)
    const datePublished =
      GenericDatePublishedExtractor.extract($, url, metaCache)
    const author = GenericAuthorExtractor.extract($, metaCache)
    const content = GenericContentExtractor.parse($, html)
    const leadImageUrl =
      GenericLeadImageUrlExtractor.extract($, content, metaCache)
    const dek = GenericDekExtractor.extract($, metaCache, content)

    return {
      title,
      author,
      datePublished: datePublished ? datePublished.toISOString() : null,
      dek,
      leadImageUrl,
      content,
    }
  }
}

export default GenericExtractor
