import cheerio from 'cheerio';
import stringDirection from 'string-direction';

import { GenericContentExtractor } from './content/extractor';
import { GenericTitleExtractor } from './title/extractor';
import { GenericAuthorExtractor } from './author/extractor';
import { GenericDatePublishedExtractor } from './date-published/extractor';
import { GenericDekExtractor } from './dek/extractor';
import { GenericLeadImageUrlExtractor } from './lead-image-url/extractor';
import { GenericNextPageUrlExtractor } from './next-page-url/extractor';
import { GenericUrlExtractor } from './url/extractor';
import { GenericExcerptExtractor } from './excerpt/extractor';
import { GenericWordCountExtractor } from './word-count/extractor';
import { UrlWithStringQuery } from 'url';
import { ExtractorResult } from '../types';

export const GenericExtractor = {
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
  direction: ({ title }: { title: string }) =>
    stringDirection.getDirection(title),

  extract(options: {
    $: cheerio.Root;
    html: string;
    url: string;
    parsedUrl?: UrlWithStringQuery;
    previousUrls?: string[];
    metaCache: string[];
  }): ExtractorResult {
    const { html, $ } = options;

    if (html && !$) {
      options.$ = cheerio.load(html);
    }

    const title = this.title(options);
    const date_published = this.date_published(options);
    const author = this.author(options);
    const content = this.content({ ...options, title });

    if (!content) {
      throw new Error('Could not parse content');
    }

    const lead_image_url = this.lead_image_url({ ...options, content });
    const dek = this.dek({ ...options, content });
    const next_page_url = this.next_page_url(options);
    const excerpt = this.excerpt({ ...options, content });
    const word_count = this.word_count({ ...options, content });
    const direction = this.direction({ title });
    const { url, domain } = this.url_and_domain(options);

    return {
      title,
      author,
      date_published,
      dek,
      lead_image_url,
      content,
      next_page_url,
      url,
      domain,
      excerpt,
      word_count,
      direction,
    };
  },
};
