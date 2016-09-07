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
  title: GenericTitleExtractor.extract,
  datePublished : GenericDatePublishedExtractor.extract,
  author: GenericAuthorExtractor.extract,
  content: GenericContentExtractor.extract.bind(GenericContentExtractor),
  leadImageUrl: GenericLeadImageUrlExtractor.extract,
  dek: GenericDekExtractor.extract,

  parse: function(url, html, $) {
    if (html) {
      $ = cheerio.load(html)
    }

    // Cached value of every meta name in our document.
    // Used when extracting title/author/date_published/dek
    const metaCache = $('meta').map((_, node) => {
      return $(node).attr('name')
    }).toArray()

    const title = this.title($, url, metaCache)
    const datePublished = this.datePublished($, url, metaCache)
    const author = this.author($, metaCache)
    const content = this.content($, html)
    const leadImageUrl = this.leadImageUrl($, content, metaCache)
    const dek = this.dek($, content, metaCache)

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
