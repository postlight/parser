import Cleaners from 'cleaners';
import { convertNodeTo } from 'utils/dom';
import GenericExtractor from './generic';

// Remove elements by an array of selectors
export function cleanBySelectors($content, $, { clean }) {
  if (!clean) return $content;

  $(clean.join(','), $content).remove();

  return $content;
}

// Transform matching elements
export function transformElements($content, $, { transforms }) {
  if (!transforms) return $content;

  Reflect.ownKeys(transforms).forEach(key => {
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

function findMatchingSelector($, selectors, extractHtml, allowMultiple) {
  return selectors.find(selector => {
    if (Array.isArray(selector)) {
      if (extractHtml) {
        return selector.reduce((acc, s) => acc && $(s).length > 0, true);
      }

      const [s, attr] = selector;
      return (
        (allowMultiple || (!allowMultiple && $(s).length === 1)) &&
        $(s).attr(attr) &&
        $(s)
          .attr(attr)
          .trim() !== ''
      );
    }

    return (
      (allowMultiple || (!allowMultiple && $(selector).length === 1)) &&
      $(selector)
        .text()
        .trim() !== ''
    );
  });
}

export function select(opts) {
  const { $, type, extractionOpts, extractHtml = false } = opts;
  // Skip if there's not extraction for this type
  if (!extractionOpts) return null;

  // If a string is hardcoded for a type (e.g., Wikipedia
  // contributors), return the string
  if (typeof extractionOpts === 'string') return extractionOpts;

  const { selectors, defaultCleaner = true, allowMultiple } = extractionOpts;

  function selectHtml(selector) {
    // If the selector type requests html as its return type
    // transform and clean the element with provided selectors
    let $content;

    // If matching selector is an array, we're considering this a
    // multi-match selection, which allows the parser to choose several
    // selectors to include in the result. Note that all selectors in the
    // array must match in order for this selector to trigger
    if (Array.isArray(selector)) {
      $content = $(selector.join(','));
      const $wrapper = $('<div></div>');
      $content.each((_, element) => {
        $wrapper.append(element);
      });

      $content = $wrapper;
    } else {
      $content = $(selector);
    }

    if ($content.length > 1) {
      return $content.toArray().map(el => $.html($(el)));
    }

    // Wrap in div so transformation can take place on root element
    $content.wrap($('<div></div>'));
    $content = $content.parent();
    $content = transformElements($content, $, extractionOpts);
    $content = cleanBySelectors($content, $, extractionOpts);
    if (Cleaners[type]) {
      $content = Cleaners[type]($content, { ...opts, defaultCleaner });
    }
    return $.html($content);
  }

  function transformAndCleanNode(_, $node) {
    $node = cleanBySelectors($node, $, extractionOpts);
    $node = transformElements($node, $, extractionOpts);
    return $node;
  }

  const matchingSelector = findMatchingSelector(
    $,
    selectors,
    extractHtml,
    allowMultiple
  );

  if (!matchingSelector) return null;

  // Declaring result; will contain either
  // text or html, which will be cleaned
  // by the appropriate cleaner type
  let result;

  if (extractHtml) {
    return selectHtml(matchingSelector);
  }

  // if selector is an array (e.g., ['img', 'src']),
  // extract the attr
  if (Array.isArray(matchingSelector)) {
    const [selector, attr] = matchingSelector;
    const $nodeWithAttr = $(selector);

    if ($nodeWithAttr.length > 1) {
      result = $nodeWithAttr
        .map((_, el) =>
          $(el)
            .attr(attr)
            .trim()
        )
        .toArray();
    } else {
      const matchingAttr = $nodeWithAttr.attr(attr).trim();
      result = allowMultiple ? [matchingAttr] : matchingAttr;
    }
  } else {
    const $node = $(matchingSelector);

    if ($node.length > 1) {
      result = $node
        .map(transformAndCleanNode)
        .map((_, el) =>
          $(el)
            .text()
            .trim()
        )
        .toArray();
    } else {
      const transformedNode = transformAndCleanNode(null, $node)
        .text()
        .trim();
      result = allowMultiple ? [transformedNode] : transformedNode;
    }
  }

  // Allow custom extractor to skip default cleaner
  // for this type; defaults to true
  if (defaultCleaner && Cleaners[type]) {
    return Cleaners[type](result, { ...opts, ...extractionOpts });
  }

  return result;
}

export function selectExtendedTypes($, extend) {
  const results = {};
  Reflect.ownKeys(extend).forEach(t => {
    if (!results[t]) {
      results[t] = select({ $, type: t, extractionOpts: extend[t] });
    }
  });
  return results;
}

function extractResult(opts) {
  const { type, extractor, fallback = true } = opts;

  const result = select({ ...opts, extractionOpts: extractor[type] });

  // If custom parser succeeds, return the result
  if (result) {
    return result;
  }

  // If nothing matches the selector, and fallback is enabled,
  // run the Generic extraction
  if (fallback) return GenericExtractor[type](opts);

  return null;
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
        ...opts,
        type: 'content',
        extractHtml: true,
        title: extractedTitle,
      });
      return {
        content,
      };
    }
    const title = extractResult({ ...opts, type: 'title' });
    const date_published = extractResult({ ...opts, type: 'date_published' });
    const author = extractResult({ ...opts, type: 'author' });
    const next_page_url = extractResult({ ...opts, type: 'next_page_url' });
    const content = extractResult({
      ...opts,
      type: 'content',
      extractHtml: true,
      title,
    });
    const lead_image_url = extractResult({
      ...opts,
      type: 'lead_image_url',
      content,
    });
    const excerpt = extractResult({ ...opts, type: 'excerpt', content });
    const dek = extractResult({ ...opts, type: 'dek', content, excerpt });
    const word_count = extractResult({ ...opts, type: 'word_count', content });
    const direction = extractResult({ ...opts, type: 'direction', title });
    const { url, domain } = extractResult({
      ...opts,
      type: 'url_and_domain',
    }) || { url: null, domain: null };

    let extendedResults = {};
    if (extractor.extend) {
      extendedResults = selectExtendedTypes(opts.$, extractor.extend);
    }

    return {
      title,
      content,
      author,
      date_published,
      lead_image_url,
      dek,
      next_page_url,
      url,
      domain,
      excerpt,
      word_count,
      direction,
      ...extendedResults,
    };
  },
};

export default RootExtractor;
