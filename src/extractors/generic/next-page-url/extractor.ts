import { articleBaseUrl, removeAnchor } from '../../../utils/text';
import scoreLinks from './scoring/score-links';

// Looks for and returns next page url
// for multi-page articles
export const GenericNextPageUrlExtractor = {
  extract({
    $,
    url,
    parsedUrl,
    previousUrls = [],
  }: {
    $: cheerio.Root;
    url: string;
    parsedUrl?: URL;
    previousUrls?: string[];
  }) {
    parsedUrl = parsedUrl || new URL(url);

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
    if (!scoredLinks) {
      return undefined;
    }

    // now that we've scored all possible pages,
    // find the biggest one.
    const topPage = Reflect.ownKeys(scoredLinks).reduce(
      (acc, link) => {
        const scoredLink = scoredLinks[String(link)];
        return scoredLink.score > acc.score ? scoredLink : acc;
      },
      { score: -100, linkText: undefined, href: undefined } as {
        score: number;
        linkText: string | undefined;
        href: string | undefined;
      }
    );

    // If the score is less than 50, we're not confident enough to use it,
    // so we fail.
    if (topPage.score >= 50) {
      return topPage.href;
    }

    return undefined;
  },
};
