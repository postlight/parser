import URL from 'url';
import cheerio from 'cheerio';
import TurndownService from 'turndown';

import Resource from 'resource';
import { validateUrl, Errors } from 'utils';
import getExtractor from 'extractors/get-extractor';
import RootExtractor from 'extractors/root-extractor';
import collectAllPages from 'extractors/collect-all-pages';

const Mercury = {
  async parse(url, { html, ...opts } = {}) {
    const {
      fetchAllPages = true,
      fallback = true,
      contentType = 'html',
    } = opts;

    // if no url was passed and this is the browser version,
    // set url to window.location.href and load the html
    // from the current page
    if (!url && cheerio.browser) {
      url = window.location.href; // eslint-disable-line no-undef
      html = html || cheerio.html();
    }

    const parsedUrl = URL.parse(url);

    if (!validateUrl(parsedUrl)) {
      return Errors.badUrl;
    }

    const $ = await Resource.create(url, html, parsedUrl);

    const Extractor = getExtractor(url, parsedUrl, $);
    // console.log(`Using extractor for ${Extractor.domain}`);

    // If we found an error creating the resource, return that error
    if ($.failed) {
      return $;
    }

    // if html still has not been set (i.e., url passed to Mercury.parse),
    // set html from the response of Resource.create
    if (!html) {
      html = $.html();
    }

    // Cached value of every meta name in our document.
    // Used when extracting title/author/date_published/dek
    const metaCache = $('meta')
      .map((_, node) => $(node).attr('name'))
      .toArray();

    let result = RootExtractor.extract(Extractor, {
      url,
      html,
      $,
      metaCache,
      parsedUrl,
      fallback,
      contentType,
    });

    const { title, next_page_url } = result;

    // Fetch more pages if next_page_url found
    if (fetchAllPages && next_page_url) {
      result = await collectAllPages({
        Extractor,
        next_page_url,
        html,
        $,
        metaCache,
        result,
        title,
        url,
      });
    } else {
      result = {
        ...result,
        total_pages: 1,
        rendered_pages: 1,
      };
    }

    if (contentType === 'markdown') {
      const turndownService = new TurndownService();
      result.content = turndownService.turndown(result.content);
    } else if (contentType === 'text') {
      result.content = $.text($(result.content));
    }

    return result;
  },

  browser: !!cheerio.browser,

  // A convenience method for getting a resource
  // to work with, e.g., for custom extractor generator
  fetchResource(url) {
    return Resource.create(url);
  },
};

export default Mercury;
