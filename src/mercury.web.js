/* eslint-disable */
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

const Mercury = {
  async parse(html, opts = {}) {
    const {
      fetchAllPages = true,
      fallback = true,
    } = opts;
    //
    const url = window.location.href;
    // const url = 'http://www.nytimes.com/2016/09/20/nyregion/nyc-nj-explosions-ahmad-khan-rahami.html'
    const parsedUrl = URL.parse(url);

    if (!validateUrl(parsedUrl)) {
      return Errors.badUrl;
    }

    const Extractor = getExtractor(url, parsedUrl);

    html = html || cheerio.html()
    const $ = await Resource.create(url, html, parsedUrl);

  //
  //   // Cached value of every meta name in our document.
  //   // Used when extracting title/author/date_published/dek
    const metaCache = $('meta').map((_, node) => $(node).attr('name')).toArray();
  //
    console.log("Using extractor for", Extractor.domain)
    let result = RootExtractor.extract(
      Extractor,
      {
        url,
        html,
        $,
        metaCache,
        parsedUrl,
        fallback,
        cheerio,
      }
    );

    $.cleanup()

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

  // A convenience method for getting a resource
  // to work with, e.g., for custom extractor generator
  async fetchResource(url) {
    return await Resource.create(url);
  },

};

export default Mercury;
