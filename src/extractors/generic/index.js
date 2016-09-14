import cheerio from 'cheerio';

import GenericContentExtractor from './content/extractor';
import GenericTitleExtractor from './title/extractor';
import GenericAuthorExtractor from './author/extractor';
import GenericDatePublishedExtractor from './date-published/extractor';
import GenericDekExtractor from './dek/extractor';
import GenericLeadImageUrlExtractor from './lead-image-url/extractor';
import GenericNextPageUrlExtractor from './next-page-url/extractor';
import GenericUrlExtractor from './url/extractor';
import GenericExcerptExtractor from './excerpt/extractor';
import GenericWordCountExtractor from './word-count/extractor';

const GenericExtractor = {
  // This extractor is the default for all domains
  domain: '*',
  title: GenericTitleExtractor.extract,
  datePublished: GenericDatePublishedExtractor.extract,
  author: GenericAuthorExtractor.extract,
  content: GenericContentExtractor.extract.bind(GenericContentExtractor),
  leadImageUrl: GenericLeadImageUrlExtractor.extract,
  dek: GenericDekExtractor.extract,
  nextPageUrl: GenericNextPageUrlExtractor.extract,
  urlAndDomain: GenericUrlExtractor.extract,
  excerpt: GenericExcerptExtractor.extract,
  wordCount: GenericWordCountExtractor.extract,

  extract(options) {
    const { html } = options;

    if (html) {
      const $ = cheerio.load(html);
      options.$ = $;
    }

    const title = this.title(options);
    const datePublished = this.datePublished(options);
    const author = this.author(options);
    const content = this.content({ ...options, title });
    const leadImageUrl = this.leadImageUrl({ ...options, content });
    const dek = this.dek({ ...options, content });
    const nextPageUrl = this.nextPageUrl(options);
    const excerpt = this.excerpt({ ...options, content });
    const wordCount = this.wordCount({ ...options, content });
    const { url, domain } = this.urlAndDomain(options);

    return {
      title,
      author,
      datePublished: datePublished || null,
      dek,
      leadImageUrl,
      content,
      nextPageUrl,
      url,
      domain,
      excerpt,
      wordCount,
    };
  },
};

export default GenericExtractor;
