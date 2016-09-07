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

  parse: function(options) {
    let { html } = options

    if (html) {
      const $ = cheerio.load(html)
      options.$ = $
    }

    const title = this.title(options)
    const datePublished = this.datePublished(options)
    const author = this.author(options)
    const content = this.content(options)
    const leadImageUrl = this.leadImageUrl(options)
    const dek = this.dek(options)

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
