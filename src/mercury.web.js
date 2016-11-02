/* eslint-disable */
import URL from 'url';
import $ from 'jquery';

// import Resource from 'resource';
import {
  validateUrl,
  Errors,
} from 'utils';
import getExtractor from 'extractors/get-extractor';
import RootExtractor from 'extractors/root-extractor';
// import collectAllPages from 'extractors/collect-all-pages';

const Mercury = {
  async parse(opts = {}) {
    const {
      fetchAllPages = false,
      fallback = true,
    } = opts;
    //
    // const url = 'http://example.com/foo/bar'
    const url = 'http://www.theatlantic.com/technology/archive/2016/09/why-new-yorkers-got-a-push-alert-about-a-manhunt/500591/'
    const parsedUrl = URL.parse(url);

    if (!validateUrl(parsedUrl)) {
      return Errors.badUrl;
    }

    const Extractor = getExtractor(url, parsedUrl);

    const html = $('html').html();
    const clone = $('html').clone()
  //
  //   // Cached value of every meta name in our document.
  //   // Used when extracting title/author/date_published/dek
    const metaCache = $('meta').map((_, node) => $(node).attr('name')).toArray();
  //
    let result = RootExtractor.extract(Extractor, { url, html, $, metaCache, parsedUrl, fallback });

    console.log(result)
  //   const { title, next_page_url } = result;
  //
  //   // Fetch more pages if next_page_url found
  //   if (fetchAllPages && next_page_url) {
  //     result = await collectAllPages(
  //       {
  //         Extractor,
  //         next_page_url,
  //         html,
  //         $,
  //         metaCache,
  //         result,
  //         title,
  //         url,
  //       }
  //     );
  //   } else {
  //     result = {
  //       ...result,
  //       total_pages: 1,
  //       rendered_pages: 1,
  //     };
  //   }
  //
  //   return result;
  // },
  //
  // // A convenience method for getting a resource
  // // to work with, e.g., for custom extractor generator
  // async fetchResource(url) {
  //   return await Resource.create(url);
  // },

  }
};

Mercury.parse();

export default Mercury;
