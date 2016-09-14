import 'babel-polyfill';
import { removeAnchor } from 'utils/text';
import RootExtractor from 'extractors/root-extractor';
import Resource from 'resource';

import Iris from '../iris';

export default async function collectAllPages(
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
) {
  let pages = 2;
  const previousUrls = [removeAnchor(url)];
  // If we've gone over 26 pages, something has
  // likely gone wrong.
  while (nextPageUrl && pages < 26) {
    $ = await Resource.create(nextPageUrl);
    html = $.html();

    const extractorOpts = {
      url: nextPageUrl,
      html,
      $,
      metaCache,
      contentOnly: true,
      extractedTitle: title,
      previousUrls,
    };

    const nextPageResult = RootExtractor.extract(Extractor, extractorOpts);

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
}
