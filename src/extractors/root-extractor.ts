import { Cleaners } from '../cleaners';
import { convertNodeTo, makeLinksAbsolute } from '../utils/dom';
import { GenericExtractor } from './generic';
import {
  CustomExtractor,
  DefaultContentType,
  Extend,
  ExtractorOptions,
  ExtractorResult,
  InnerExtractorOptions,
  ExtractResultOptions,
  Selector,
  SelectedExtractOptions,
  FullExtractorResult,
  ContentExtractorResult,
} from './types';

// Remove elements by an array of selectors
export function cleanBySelectors(
  $content: cheerio.Cheerio,
  $: cheerio.Root,
  { clean }: { clean?: string[] }
) {
  if (!clean) {
    return $content;
  }

  $(clean.join(','), $content).remove();

  return $content;
}

// Transform matching elements
export function transformElements(
  $content: cheerio.Cheerio,
  $: cheerio.Root,
  {
    transforms,
  }: {
    transforms?: Record<
      string,
      string | ((node: cheerio.Cheerio, $: cheerio.Root) => unknown)
    >;
  }
) {
  if (!transforms) {
    return $content;
  }

  Reflect.ownKeys(transforms).forEach(key => {
    const stringKey = String(key);
    const $matches = $(stringKey, $content);
    const value = transforms[stringKey];

    // If value is a string, convert directly
    if (typeof value === 'string') {
      $matches.each((index, node) => {
        convertNodeTo($(node), $, value);
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

function findMatchingSelector(
  $: cheerio.Root,
  selectors: Selector[],
  extractHtml: boolean,
  allowMultiple: boolean | undefined
) {
  return selectors.find(selector => {
    if (Array.isArray(selector)) {
      if (extractHtml) {
        // Ignore function selectors, if they're present
        return (selector.filter(s => typeof s === 'string') as string[]).reduce(
          (acc, s) => acc && $(s).length > 0,
          true as boolean
        );
      }

      const [s, attr] = selector;
      return (
        (allowMultiple || (!allowMultiple && $(s).length === 1)) &&
        $(s).attr(attr) &&
        $(s).attr(attr)?.trim() !== ''
      );
    }

    return (
      (allowMultiple || (!allowMultiple && $(selector).length === 1)) &&
      $(selector).text().trim() !== ''
    );
  });
}

export function select(opts: SelectedExtractOptions) {
  const { $, type, extractionOpts, extractHtml = false } = opts;
  // Skip if there's not extraction for this type
  if (!extractionOpts) {
    return undefined;
  }

  // If a string is hardcoded for a type (e.g., Wikipedia
  // contributors), return the string
  if (typeof extractionOpts === 'string') {
    return extractionOpts;
  }

  const { selectors, defaultCleaner = true, allowMultiple } = extractionOpts;

  const matchingSelector = findMatchingSelector(
    $,
    selectors ?? [],
    extractHtml,
    allowMultiple
  );

  if (!matchingSelector) {
    return undefined;
  }

  function transformAndClean($node: cheerio.Cheerio) {
    makeLinksAbsolute($node, $, opts.url || '');
    cleanBySelectors($node, $, extractionOpts as InnerExtractorOptions);
    transformElements($node, $, extractionOpts as InnerExtractorOptions);
    return $node;
  }

  function selectHtml() {
    // If the selector type requests html as its return type
    // transform and clean the element with provided selectors
    let $content: cheerio.Cheerio;

    // If matching selector is an array, we're considering this a
    // multi-match selection, which allows the parser to choose several
    // selectors to include in the result. Note that all selectors in the
    // array must match in order for this selector to trigger
    if (Array.isArray(matchingSelector)) {
      $content = $(matchingSelector.join(','));
      const $wrapper = $('<div></div>');
      $content.each((_, element) => {
        // TODO: What's up with this cast?
        $wrapper.append(element as unknown as cheerio.Cheerio);
      });

      $content = $wrapper;
    } else {
      $content = $(matchingSelector);
    }

    // Wrap in div so transformation can take place on root element
    $content.wrap($('<div></div>'));
    $content = $content.parent();
    $content = transformAndClean($content);
    if (type in Cleaners) {
      Cleaners[type as keyof typeof Cleaners]($content, {
        ...opts,
        defaultCleaner,
      });
    }

    if (allowMultiple) {
      return $content
        .children()
        .toArray()
        .map(el => $.html($(el)));
    }

    return $.html($content);
  }

  if (extractHtml) {
    return selectHtml();
  }

  let $match: cheerio.Cheerio;
  let result: cheerio.Cheerio;
  // if selector is an array (e.g., ['img', 'src']),
  // extract the attr
  if (Array.isArray(matchingSelector)) {
    const [selector, attr, transform] = matchingSelector;
    $match = $(selector);
    $match = transformAndClean($match);
    result = $match.map((_, el) => {
      const item = $(el).attr(attr)?.trim() ?? '';
      return transform ? transform(item) : item;
    });
  } else {
    $match = $(matchingSelector);
    $match = transformAndClean($match);
    result = $match.map((_, el) => $(el).text().trim());
  }

  const finalResult =
    Array.isArray(result.toArray()) && allowMultiple
      ? (result.toArray() as unknown as string[])
      : (result[0] as unknown as string);
  // Allow custom extractor to skip default cleaner
  // for this type; defaults to true
  if (defaultCleaner && type in Cleaners) {
    return Cleaners[type as keyof typeof Cleaners](finalResult as any, {
      ...opts,
      ...extractionOpts,
    });
  }

  return finalResult;
}

export function selectExtendedTypes(
  extend: Extend,
  opts: Omit<SelectedExtractOptions, 'type'>
) {
  const results: Record<string, string | string[]> = {};
  Reflect.ownKeys(extend).forEach(t => {
    const type = String(t);

    if (!results[type]) {
      // TODO: This cast isn't safe. Maybe add a generic for addition extended types
      const selectedData = select({
        ...opts,
        type: type as DefaultContentType,
        extractionOpts: extend[type],
      });
      if (selectedData) {
        results[type] = selectedData;
      }
    }
  });

  return results;
}

function extractResult<T extends DefaultContentType>(
  opts: ExtractResultOptions & { content?: string }
): ReturnType<typeof GenericExtractor[T]> {
  type Result = ReturnType<typeof GenericExtractor[T]>;
  const { type, extractor, fallback = true } = opts;

  const result = select({ ...opts, extractionOpts: extractor[type] });

  // If custom parser succeeds, return the result
  if (result) {
    return result as Result;
  }

  // If nothing matches the selector, and fallback is enabled,
  // run the Generic extraction
  if (fallback) {
    return GenericExtractor[type](opts) as Result;
  }

  return undefined as Result;
}

export const RootExtractor = {
  extract(
    extractor: CustomExtractor | undefined,
    opts: ExtractorOptions
  ): FullExtractorResult | ContentExtractorResult {
    const { contentOnly, extractedTitle } = opts;
    // This is the generic extractor. Run its extract method
    if (!extractor) {
      return {
        type: 'full',
        ...GenericExtractor.extract(opts),
      };
    }

    const selectionOptions: Omit<ExtractResultOptions, 'type'> = {
      ...opts,
      extractor,
    };

    if (contentOnly) {
      const content = extractResult<'content'>({
        ...selectionOptions,
        type: 'content',
        extractHtml: true,
        title: extractedTitle,
      });
      const next_page_url = extractResult<'next_page_url'>({
        ...selectionOptions,
        type: 'next_page_url',
      });

      return {
        type: 'contentOnly',
        content,
        next_page_url,
      };
    }
    const title = extractResult<'title'>({
      ...selectionOptions,
      type: 'title',
    });
    const date_published = extractResult<'date_published'>({
      ...selectionOptions,
      type: 'date_published',
    });
    const author = extractResult<'author'>({
      ...selectionOptions,
      type: 'author',
    });
    const next_page_url = extractResult<'next_page_url'>({
      ...selectionOptions,
      type: 'next_page_url',
    });
    const content = extractResult<'content'>({
      ...selectionOptions,
      type: 'content',
      extractHtml: true,
      title,
    });
    const lead_image_url = extractResult<'lead_image_url'>({
      ...selectionOptions,
      type: 'lead_image_url',
      content,
    });
    const excerpt = extractResult<'excerpt'>({
      ...selectionOptions,
      type: 'excerpt',
      content,
    });
    const dek = extractResult<'dek'>({
      ...selectionOptions,
      type: 'dek',
      content,
      excerpt,
    });
    const word_count = extractResult<'word_count'>({
      ...selectionOptions,
      type: 'word_count',
      content,
    });
    const direction = extractResult<'direction'>({
      ...selectionOptions,
      type: 'direction',
      title,
    });
    const { url, domain } = extractResult<'url_and_domain'>({
      ...selectionOptions,
      type: 'url_and_domain',
    }) || { url: null, domain: null };

    let extendedResults: Record<string, string | string[]> = {};
    if (extractor.extend) {
      extendedResults = selectExtendedTypes(extractor.extend, selectionOptions);
    }

    return {
      type: 'full',
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
