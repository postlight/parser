import cheerio from 'cheerio';
import iconv from 'iconv-lite';

import { getEncoding, getSupportedMime } from 'utils/text';
import { fetchResource } from './utils';
import {
  normalizeMetaTags,
  convertLazyLoadedImages,
  clean,
} from './utils/dom';

const Resource = {

  // Create a Resource.
  //
  // :param url: The URL for the document we should retrieve.
  // :param response: If set, use as the response rather than
  //                  attempting to fetch it ourselves. Expects a
  //                  string.
  async create(url, preparedResponse, parsedUrl) {
    let result;
    if (preparedResponse) {
      const validResponse = {
        statusMessage: 'OK',
        statusCode: 200,
        headers: {
          'content-type': 'text/html',
          'content-length': 500,
        },
      };
      result = { body: preparedResponse, response: validResponse };
    } else {
      result = await fetchResource(url, parsedUrl);
    }

    if (result.error) {
      result.failed = true;
      return result;
    }

    return this.generateDoc(result);
  },

  generateDoc({ body: content, response }) {
    const { headers } = response;
    const { 'content-type': contentType } = headers;

    // TODO: Implement is_text function from
    // https://github.com/ReadabilityHoldings/readability/blob/8dc89613241d04741ebd42fa9fa7df1b1d746303/readability/utils/text.py#L57
    if (!getSupportedMime(contentType)) {
      throw new Error('Content does not appear to be text.');
    }

    let $ = '';
    content = this.encodeDoc({ content, contentType });
    if (contentType.includes('html')) {
      $ = this.processHtml({ content });
    } else {
      $ = content;
    }

    return { $, headers };
  },

  processHtml({ content }) {
    if (content.root().children().length === 0) {
      throw new Error('No children, likely a bad parse.');
    }

    content = normalizeMetaTags(content);
    content = convertLazyLoadedImages(content);
    content = clean(content);

    return content;
  },

  encodeDoc({ content, contentType }) {
    const mimeType = getSupportedMime(contentType);
    const encoding = getEncoding(contentType);

    let decodedContent = iconv.decode(content, encoding);
    let $ = '';

    if (mimeType === 'text/html') {
      $ = cheerio.load(decodedContent);
      // after first cheerio.load, check to see if encoding matches
      const metaContentType = $('meta[http-equiv=content-type]').attr('content');
      const properEncoding = getEncoding(metaContentType);

      // if encodings in the header/body dont match, use the one in the body
      if (properEncoding !== encoding) {
        decodedContent = iconv.decode(content, properEncoding);
        $ = cheerio.load(decodedContent);
      }
    } else {
      $ = decodedContent;
    }

    return $;
  },
};

export default Resource;
