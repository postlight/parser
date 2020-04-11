import cheerio from 'cheerio';
import iconv from 'iconv-lite';

import { getEncoding } from 'utils/text';
import { fetchResource } from './utils';
import { clean, convertLazyLoadedImages, normalizeMetaTags } from './utils/dom';

const Resource = {
  // Create a Resource.
  //
  // :param url: The URL for the document we should retrieve.
  // :param response: If set, use as the response rather than
  //                  attempting to fetch it ourselves. Expects a
  //                  string.
  // :param headers: Custom headers to be included in the request
  async create(url, preparedResponse, parsedUrl, headers = {}) {
    let result;

    if (preparedResponse) {
      result = { content: preparedResponse, contentType: 'text/html' };
    } else {
      result = await fetchResource(url, parsedUrl, headers);
    }

    if (result.error) {
      result.failed = true;
      return result;
    }

    return this.generateDoc(result);
  },

  generateDoc({ content, contentType = '' }) {
    let $ = this.encodeDoc({ content, contentType });

    if ($.root().children().length === 0) {
      throw new Error('No children, likely a bad parse.');
    }

    $ = normalizeMetaTags($);
    $ = convertLazyLoadedImages($);
    $ = clean($);

    return $;
  },

  encodeDoc({ content, contentType }) {
    const encoding = getEncoding(contentType);
    let decodedContent = iconv.decode(content, encoding);
    let $ = cheerio.load(decodedContent);

    // after first cheerio.load, check to see if encoding matches
    const contentTypeSelector = cheerio.browser
      ? 'meta[http-equiv=content-type]'
      : 'meta[http-equiv=content-type i]';
    const metaContentType =
      $(contentTypeSelector).attr('content') ||
      $('meta[charset]').attr('charset');
    const properEncoding = getEncoding(metaContentType);

    // if encodings in the header/body dont match, use the one in the body
    if (metaContentType && properEncoding !== encoding) {
      decodedContent = iconv.decode(content, properEncoding);
      $ = cheerio.load(decodedContent);
    }

    return $;
  },
};

export default Resource;
