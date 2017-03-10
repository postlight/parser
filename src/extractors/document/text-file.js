import cleanDatePublished from '../../cleaners/date-published';
import GenericExtractor from '../generic';

export default function textExtractor({ $, parsedUrl, headers }) {
  // Extract the filename to be the title
  const { path } = parsedUrl;

  const size = path.split('/').length;
  const title = path.split('/')[size - 1];

  // Extract content
  const content = $.replace(/(?:\r\n|\r|\n)/g, '<br />');

  // Date Published
  const date_published = cleanDatePublished(headers['last-modified']);

  // URL
  const url = parsedUrl.href;

  // Domain
  const domain = parsedUrl.hostname;

  // Word Count
  const word_count = GenericExtractor.word_count({ content }, false);

  return {
    title,
    content,
    author: null,
    date_published,
    lead_image_url: null,
    dek: null,
    next_page_url: null,
    url,
    domain,
    excerpt: null,
    word_count,
    direction: null,
  };
}
