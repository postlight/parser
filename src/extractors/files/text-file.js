import stringDirection from 'string-direction';
import cleanDatePublished from '../../cleaners/date-published';
import titleFromFilename from '../../utils/text/title-from-filename';
import textToHtml from '../../utils/text/text-to-html';

function checkPublishDate(headers) {
  if (headers['last-modified']) {
    return cleanDatePublished(headers['last-modified'], { format: 'ddd, DD MMM YYYY hh:mm:ss zz' });
  }
  return null;
}

const TextExtractor = {
  domain: '*',
  title: titleFromFilename,
  date_published: checkPublishDate,
  content: textToHtml,
  direction: ({ title }) => stringDirection.getDirection(title),

  extract(options) {
    const { $, parsedUrl, headers } = options;

    const title = this.title(parsedUrl);
    const content = this.content($);
    const date_published = this.date_published(headers);
    const url = parsedUrl.href;
    const domain = parsedUrl.hostname;
    const direction = this.direction({ title });

    return {
      title,
      content,
      date_published: date_published || null,
      url,
      domain,
      direction,
    };
  },
};

export default TextExtractor;
