import URL from 'url';

import Resource from 'resource';
import {
  validateUrl,
  Errors,
} from 'utils';
import getExtractor from 'extractors/get-extractor';
import RootExtractor from 'extractors/root-extractor';
import collectAllPages from 'extractors/collect-all-pages';

const Iris = {
  async parse(url, html, opts = {}) {
    const { fetchAllPages = true } = opts || true;

    const parsedUrl = URL.parse(url);

    if (!validateUrl(parsedUrl)) {
      return Errors.badUrl;
    }

    const Extractor = getExtractor(url, parsedUrl);
    // console.log(`Using extractor for ${Extractor.domain}`);

    const $ = await Resource.create(url, html, parsedUrl);

    // If we found an error creating the resource, return that error
    if ($.error) {
      return $;
    }

    html = $.html();

    // Cached value of every meta name in our document.
    // Used when extracting title/author/date_published/dek
    const metaCache = $('meta').map((_, node) => $(node).attr('name')).toArray();

    let result = RootExtractor.extract(Extractor, { url, html, $, metaCache, parsedUrl });
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

export default Iris;
