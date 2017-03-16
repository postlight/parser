import stringDirection from 'string-direction';
import cleanDatePublished from '../../cleaners/date-published';
import titleFromFilename from '../../utils/text/title-from-filename';
import textToHtml from '../../utils/text/text-to-html';

const TextExtractor = {
  domain: '*',
  title: titleFromFilename,
  date_published: cleanDatePublished,
  content: textToHtml,
  direction: ({ title }) => stringDirection.getDirection(title),

  extract(options) {
    const { $, parsedUrl, headers } = options;

    const title = this.title(parsedUrl);
    const content = this.content($);
    const date_published =
      this.date_published(headers['last-modified'] ? headers['last-modified'] : '');
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
