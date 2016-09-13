import Resource from 'resource';
import getExtractor from 'extractors/get-extractor';
import RootExtractor from 'extractors/root-extractor';
import { removeAnchor } from 'utils/text';

const Iris = {
  async parse(url, html, opts = {}) {
    const { fetchAllPages = true } = opts || true;
    const $ = await Resource.create(url, html);
    html = $.html();

    const Extractor = getExtractor(url);
    console.log(`Using extractor for ${Extractor.domain}`);

    // Cached value of every meta name in our document.
    // Used when extracting title/author/date_published/dek
    const metaCache = $('meta').map((_, node) => $(node).attr('name')).toArray();

    const extractorOpts = { url, html, $, metaCache };
    let result = RootExtractor.extract(Extractor, extractorOpts);
    const { title, nextPageUrl } = result;

    if (fetchAllPages && nextPageUrl) {
      result = await this.collectAllPages(
        {
          nextPageUrl,
          html,
          $,
          metaCache,
          result,
          Extractor,
          title,
          url,
        }
      );
    }

    return result;
  },

  async collectAllPages({
    nextPageUrl,
    html,
    $,
    metaCache,
    result,
    Extractor,
    title,
    url,
  }) {
    let pages = 2;
    const previousUrls = [removeAnchor(url)];
    while (nextPageUrl && pages < 26) {
      $ = await Resource.create(nextPageUrl);
      html = $.html();
      const extractorOpts = { url: nextPageUrl, html, $, metaCache };
      const nextPageResult = RootExtractor.extract(
        Extractor,
        {
          ...extractorOpts,
          url: nextPageUrl,
          contentOnly: true,
          extractedTitle: title,
          previousUrls,
        }
      );

      previousUrls.push(nextPageUrl);
      result = {
        ...result,
        content: `
          ${result.content}
          <hr>
          <h4>Page ${pages}</h4>
          ${nextPageResult.content}
          `,
      };

      nextPageUrl = nextPageResult.nextPageUrl;

      pages += 1;
    }
    return result;
  },
};

export default Iris;
