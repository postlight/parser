import cheerio from 'cheerio';
import TurndownService from 'turndown';
import stringDirection from 'string-direction';

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
  date_published: GenericDatePublishedExtractor.extract,
  author: GenericAuthorExtractor.extract,
  content: GenericContentExtractor.extract.bind(GenericContentExtractor),
  lead_image_url: GenericLeadImageUrlExtractor.extract,
  dek: GenericDekExtractor.extract,
  next_page_url: GenericNextPageUrlExtractor.extract,
  url_and_domain: GenericUrlExtractor.extract,
  excerpt: GenericExcerptExtractor.extract,
  word_count: GenericWordCountExtractor.extract,
  direction: ({ title }) => stringDirection.getDirection(title),

  extract(options) {
    const { html, $, contentType = 'html' } = options;

    if (html && !$) {
      const loaded = cheerio.load(html, { decodeEntities: false });
      options.$ = loaded;
    }

    const title = this.title(options);
    const date_published = this.date_published(options);
    const author = this.author(options);
    const content = this.content({ ...options, title });
    const lead_image_url = this.lead_image_url({ ...options, content });
    const dek = this.dek({ ...options, content });
    const next_page_url = this.next_page_url(options);
    const excerpt = this.excerpt({ ...options, content });
    const word_count = this.word_count({ ...options, content });
    const direction = this.direction({ title });
    const { url, domain } = this.url_and_domain(options);

    let convertedContent;

    if (contentType === 'html') {
      convertedContent = content;
    } else if (contentType === 'text') {
      convertedContent = $.text(
        cheerio.load(content, { decodeEntities: false })
      );
    } else if (contentType === 'markdown') {
      const turndownService = new TurndownService();
      convertedContent = turndownService.turndown(content);
    }

    return {
      title,
      author,
      date_published: date_published || null,
      dek,
      lead_image_url,
      content: convertedContent,
      next_page_url,
      url,
      domain,
      excerpt,
      word_count,
      direction,
    };
  },
};

export default GenericExtractor;
