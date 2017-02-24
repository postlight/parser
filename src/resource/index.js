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

  // set utf8 as default encoding if encoding not found in headers
  generateDoc({ body: content, response, encoding = 'utf8' }) {
    const { 'content-type': contentType } = response.headers;

    // TODO: Implement is_text function from
    // https://github.com/ReadabilityHoldings/readability/blob/8dc89613241d04741ebd42fa9fa7df1b1d746303/readability/utils/text.py#L57
    if (!contentType.includes('html') &&
        !contentType.includes('text')) {
      throw new Error('Content does not appear to be text.');
    }

    // decode if encoding exists
    if (iconv.encodingExists(encoding)) {
      content = iconv.decode(content, encoding);
    }
    let $ = cheerio.load(content);

    // after first cheerio.load, check to see if encoding matches
    const metaContentType = $('meta[http-equiv=content-type]').attr('content');
    const properEncoding = getEncoding(metaContentType);
    if (properEncoding && properEncoding !== encoding && iconv.encodingExists(properEncoding)) {
      content = iconv.decode(content, properEncoding);
      $ = cheerio.load(content);
    }

    if ($.root().children().length === 0) {
      throw new Error('No children, likely a bad parse.');
    }

    $ = normalizeMetaTags($);
    $ = convertLazyLoadedImages($);
    $ = clean($);

    return $;
  },
};

export default Resource;
