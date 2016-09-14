import 'babel-polyfill';

import Cleaners from 'cleaners';
import { convertNodeTo } from 'utils/dom';
import GenericExtractor from './generic';
import { ATTR_RE } from './constants';

// Remove elements by an array of selectors
export function cleanBySelectors($content, $, { clean }) {
  if (!clean) return null;

  $(clean.join(','), $content).remove();

  return $content;
}

// Transform matching elements
export function transformElements($content, $, { transforms }) {
  if (!transforms) return null;

  Reflect.ownKeys(transforms).forEach((key) => {
    const $matches = $(key, $content);
    const value = transforms[key];

    // If value is a string, convert directly
    if (typeof value === 'string') {
      $matches.each((index, node) => {
        convertNodeTo($(node), $, transforms[key]);
      });
    } else if (typeof value === 'function') {
      // If value is function, apply function to node
      $matches.each((index, node) => {
        const result = value($(node), $);
        // If function returns a string, convert node to that value
        if (typeof result === 'string') {
          convertNodeTo($(node), $, result);
        }
      });
    }
  });

  return $content;
}

export function select(opts) {
  const { $, type, extractionOpts, extractHtml = false } = opts;
  // Skip if there's not extraction for this type
  if (!extractionOpts) return null;

  // If a string is hardcoded for a type (e.g., Wikipedia
  // contributors), return the string
  if (typeof extractionOpts === 'string') return extractionOpts;

  const { selectors } = extractionOpts;

  const matchingSelector = selectors.find(selector => $(selector).length === 1 && $(selector).text().trim() !== '');

  if (!matchingSelector) return null;

  // Declaring result; will contain either
  // text or html, which will be cleaned
  // by the appropriate cleaner type

  // If the selector type requests html as its return type
  // transform and clean the element with provided selectors
  if (extractHtml) {
    let $content = $(matchingSelector);

    // Wrap in div so transformation can take place on root element
    $content.wrap($('<div></div>'));
    $content = $content.parent();

    $content = transformElements($content, $, extractionOpts);
    $content = cleanBySelectors($content, $, extractionOpts);

    $content = Cleaners[type]($content, opts);

    return $.html($content);
  }
  // if selector includes an attr (e.g., img[src]),
  // extract the attr
  const attr = matchingSelector.match(ATTR_RE);
  let result;

  if (attr) {
    result = $(matchingSelector).attr(attr[1]);
  } else {
    // otherwise use the text of the node
    result = $(matchingSelector).text();
  }
  return Cleaners[type](result, opts);
}

function extractResult(opts) {
  const { type, extractor } = opts;

  // If nothing matches the selector,
  // run the Generic extraction
  return select({ ...opts, extractionOpts: extractor[type] }) ||
    GenericExtractor[type](opts);
}

const RootExtractor = {
  extract(extractor = GenericExtractor, opts) {
    const { contentOnly, extractedTitle } = opts;
    // This is the generic extractor. Run its extract method
    if (extractor.domain === '*') return extractor.extract(opts);

    opts = {
      ...opts,
      extractor,
    };

    if (contentOnly) {
      const content = extractResult({
        ...opts, type: 'content', extractHtml: true, title: extractedTitle,
      });
      return {
        content,
      };
    }
    const title = extractResult({ ...opts, type: 'title' });
    const datePublished = extractResult({ ...opts, type: 'datePublished' });
    const author = extractResult({ ...opts, type: 'author' });
    const nextPageUrl = extractResult({ ...opts, type: 'nextPageUrl' });
    const content = extractResult({
      ...opts, type: 'content', extractHtml: true, title,
    });
    const leadImageUrl = extractResult({ ...opts, type: 'leadImageUrl', content });
    const dek = extractResult({ ...opts, type: 'dek', content });
    const excerpt = extractResult({ ...opts, type: 'excerpt', content });
    const wordCount = extractResult({ ...opts, type: 'wordCount', content });
    const { url, domain } = extractResult({ ...opts, type: 'urlAndDomain' });

    return {
      title,
      content,
      author,
      datePublished,
      leadImageUrl,
      dek,
      nextPageUrl,
      url,
      domain,
      excerpt,
      wordCount,
    };
  },
};

export default RootExtractor;
