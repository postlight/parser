import URL from 'url';
import wuzzy from 'wuzzy';

import { TITLE_SPLITTERS_RE, DOMAIN_ENDINGS_RE } from './constants';

function extractBreadcrumbTitle(splitTitle, text) {
  // This must be a very breadcrumbed title, like:
  // The Best Gadgets on Earth : Bits : Blogs : NYTimes.com
  // NYTimes - Blogs - Bits - The Best Gadgets on Earth
  if (splitTitle.length >= 6) {
    // Look to see if we can find a breadcrumb splitter that happens
    // more than once. If we can, we'll be able to better pull out
    // the title.
    const termCounts = splitTitle.reduce((acc, titleText) => {
      acc[titleText] = acc[titleText] ? acc[titleText] + 1 : 1;
      return acc;
    }, {});

    const [maxTerm, termCount] = Reflect.ownKeys(termCounts).reduce(
      (acc, key) => {
        if (acc[1] < termCounts[key]) {
          return [key, termCounts[key]];
        }

        return acc;
      },
      [0, 0]
    );

    // We found a splitter that was used more than once, so it
    // is probably the breadcrumber. Split our title on that instead.
    // Note: max_term should be <= 4 characters, so that " >> "
    // will match, but nothing longer than that.
    if (termCount >= 2 && maxTerm.length <= 4) {
      splitTitle = text.split(maxTerm);
    }

    const splitEnds = [splitTitle[0], splitTitle.slice(-1)];
    const longestEnd = splitEnds.reduce(
      (acc, end) => (acc.length > end.length ? acc : end),
      ''
    );

    if (longestEnd.length > 10) {
      return longestEnd;
    }

    return text;
  }

  return null;
}

function cleanDomainFromTitle(splitTitle, url) {
  // Search the ends of the title, looking for bits that fuzzy match
  // the URL too closely. If one is found, discard it and return the
  // rest.
  //
  // Strip out the big TLDs - it just makes the matching a bit more
  // accurate. Not the end of the world if it doesn't strip right.
  const { host } = URL.parse(url);
  const nakedDomain = host.replace(DOMAIN_ENDINGS_RE, '');

  const startSlug = splitTitle[0].toLowerCase().replace(' ', '');
  const startSlugRatio = wuzzy.levenshtein(startSlug, nakedDomain);

  if (startSlugRatio > 0.4 && startSlug.length > 5) {
    return splitTitle.slice(2).join('');
  }

  const endSlug = splitTitle
    .slice(-1)[0]
    .toLowerCase()
    .replace(' ', '');
  const endSlugRatio = wuzzy.levenshtein(endSlug, nakedDomain);

  if (endSlugRatio > 0.4 && endSlug.length >= 5) {
    return splitTitle.slice(0, -2).join('');
  }

  return null;
}

// Given a title with separators in it (colons, dashes, etc),
// resolve whether any of the segments should be removed.
export default function resolveSplitTitle(title, url = '') {
  // Splits while preserving splitters, like:
  // ['The New New York', ' - ', 'The Washington Post']
  const splitTitle = title.split(TITLE_SPLITTERS_RE);
  if (splitTitle.length === 1) {
    return title;
  }

  let newTitle = extractBreadcrumbTitle(splitTitle, title);
  if (newTitle) return newTitle;

  newTitle = cleanDomainFromTitle(splitTitle, url);
  if (newTitle) return newTitle;

  // Fuzzy ratio didn't find anything, so this title is probably legit.
  // Just return it all.
  return title;
}
