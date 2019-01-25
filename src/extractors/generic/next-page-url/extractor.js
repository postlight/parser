import URL from 'url';

import { articleBaseUrl, removeAnchor } from 'utils/text';
import scoreLinks from './scoring/score-links';

// Looks for and returns next page url
// for multi-page articles
const GenericNextPageUrlExtractor = {
  extract({ $, url, parsedUrl, previousUrls = [] }) {
    parsedUrl = parsedUrl || URL.parse(url);

    const articleUrl = removeAnchor(url);
    const baseUrl = articleBaseUrl(url, parsedUrl);

    const links = $('a[href]').toArray();

    const scoredLinks = scoreLinks({
      links,
      articleUrl,
      baseUrl,
      parsedUrl,
      $,
      previousUrls,
    });

    // If no links were scored, return null
    if (!scoredLinks) return null;

    // now that we've scored all possible pages,
    // find the biggest one.
    const topPage = Reflect.ownKeys(scoredLinks).reduce(
      (acc, link) => {
        const scoredLink = scoredLinks[link];
        return scoredLink.score > acc.score ? scoredLink : acc;
      },
      { score: -100 }
    );

    // If the score is less than 50, we're not confident enough to use it,
    // so we fail.
    if (topPage.score >= 50) {
      return topPage.href;
    }

    return null;
  },
};

export default GenericNextPageUrlExtractor;
