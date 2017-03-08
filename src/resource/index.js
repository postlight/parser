import cheerio from 'cheerio';
import iconv from 'iconv-lite';

import { getEncoding } from 'utils/text';
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
  async create(url, preparedResponse, parsedUrl, opts) {
    let result;

    let validResponse = '';
    if (preparedResponse) {
      if (opts.customHeader) {
        validResponse = opts.customHeader;
      } else {
        validResponse = {
          statusMessage: 'OK',
          statusCode: 200,
          headers: {
            'content-type': 'text/html',
            'content-length': 500,
          },
        };
      }
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
    const { 'content-type': contentType } = response.headers;
    const { headers } = response;

    // TODO: Implement is_text function from
    // https://github.com/ReadabilityHoldings/readability/blob/8dc89613241d04741ebd42fa9fa7df1b1d746303/readability/utils/text.py#L57
    if (!contentType.includes('html') &&
        !contentType.includes('text')) {
      throw new Error('Content does not appear to be text.');
    }

    let $ = '';

    if (contentType.includes('html')) {
      $ = this.processHtml({ content, contentType });
    } else {
      $ = content;
    }

    return { $, headers };
  },

  processHtml({ content, contentType }) {
    let doc = this.encodeDoc({ content, contentType });

    if (doc.root().children().length === 0) {
      throw new Error('No children, likely a bad parse.');
    }

    doc = normalizeMetaTags(doc);
    doc = convertLazyLoadedImages(doc);
    doc = clean(doc);

    return doc;
  },

  encodeDoc({ content, contentType }) {
    const encoding = getEncoding(contentType);
    let decodedContent = iconv.decode(content, encoding);
    let $ = cheerio.load(decodedContent);

    // after first cheerio.load, check to see if encoding matches
    const metaContentType = $('meta[http-equiv=content-type]').attr('content');
    const properEncoding = getEncoding(metaContentType);

    // if encodings in the header/body dont match, use the one in the body
    if (properEncoding !== encoding) {
      decodedContent = iconv.decode(content, properEncoding);
      $ = cheerio.load(decodedContent);
    }

    return $;
  },
};

export default Resource;
