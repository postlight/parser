import URL from 'url';
import cheerio from 'cheerio';

import Resource from 'resource';
import {
  validateUrl,
  Errors,
} from 'utils';
import getExtractor from 'extractors/get-extractor';
import RootExtractor from 'extractors/root-extractor';
import collectAllPages from 'extractors/collect-all-pages';
import textExtractor from 'extractors/document/text-file';

const Mercury = {
  async parse(url, opts = {}) {
    let { html = false } = opts;
    const {
      fetchAllPages = true,
      fallback = true,
    } = opts;

    // if no url was passed and this is the browser version,
    // set url to window.location.href and load the html
    // from the current page
    if (!url && cheerio.browser) {
      url = window.location.href; // eslint-disable-line no-undef
      if (document.doctype !== null) { // eslint-disable-line no-undef
        html = cheerio.html();
      }
    }

    const parsedUrl = URL.parse(url);

    if (!validateUrl(parsedUrl)) {
      return Errors.badUrl;
    }

    const { $, headers } = await Resource.create(url, html, parsedUrl);

    let result = '';
    if (headers['content-type'].includes('text/html')) {
      result = this.htmlExtractor({ url, parsedUrl, $, html, fallback, fetchAllPages });
    } else {
      result = textExtractor({ $, parsedUrl, headers });
    }

    // if this parse is happening in the browser,
    // clean up any trace from the page.
    if (cheerio.browser) {
      cheerio.cleanup();
    }

    return result;
  },

  browser: !!cheerio.browser,

  // A convenience method for getting a resource
  // to work with, e.g., for custom extractor generator
  async fetchResource(url) {
    return await Resource.create(url);
  },

  async htmlExtractor({ url, parsedUrl, $, parsedHtml, fallback, fetchAllPages }) {
    const Extractor = getExtractor(url, parsedUrl, $);
    // console.log(`Using extractor for ${Extractor.domain}`);

    // If we found an error creating the resource, return that error
    if ($.failed) {
      return $;
    }

    // if html still has not been set (i.e., url passed to Mercury.parse),
    // set html from the response of Resource.create
    let html = '';
    if (!parsedHtml) {
      html = $.html();
    } else {
      html = parsedHtml;
    }

    // Cached value of every meta name in our document.
    // Used when extracting title/author/date_published/dek
    const metaCache = $('meta').map((_, node) => $(node).attr('name')).toArray();

    let result = RootExtractor.extract(
      Extractor,
      {
        url,
        html,
        $,
        metaCache,
        parsedUrl,
        fallback,
      });

    const { title, next_page_url } = result;

    // Fetch more pages if next_page_url found
    if (fetchAllPages && next_page_url) {
      result = await collectAllPages(
        {
          Extractor,
          next_page_url,
          html,
          $,
          metaCache,
          result,
          title,
          url,
        }
      );
    } else {
      result = {
        ...result,
        total_pages: 1,
        rendered_pages: 1,
      };
    }

    return result;
  },

};

export default Mercury;
