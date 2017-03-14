import cleanDatePublished from '../../cleaners/date-published';
import titleFromFilename from '../../utils/text/title-from-filename';

export default function textExtractor({ $, parsedUrl, headers }) {
  // Extract the filename to be the title
  const title = titleFromFilename(parsedUrl);

  // Extract content
  const content = $.replace(/(?:\r\n|\r|\n)/g, '<br />');

  // Date Published
  const date_published = cleanDatePublished(headers['last-modified']);

  // URL
  const url = parsedUrl.href;

  // Domain
  const domain = parsedUrl.hostname;

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
    direction: null,
  };
}
