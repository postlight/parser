import cheerio from 'cheerio';
import TurndownService from 'turndown';

import Resource from './resource';
import { addExtractor } from './extractors/add-extractor';
import { getExtractor } from './extractors/get-extractor';
import {
  RootExtractor,
  selectExtendedTypes,
} from './extractors/root-extractor';
import { collectAllPages } from './extractors/collect-all-pages';
import { ErrorResult, Options, Result } from './types';

export const parse = async (
  url: string,
  { html, extend, customExtractor, ...opts }: Options | undefined = {}
): Promise<Result | ErrorResult> => {
  const {
    fetchAllPages = true,
    fallback = true,
    contentType = 'html',
    headers,
  } = opts;

  // if no url was passed and this is the browser version,
  // set url to window.location.href and load the html
  // from the current page
  if (!url && (cheerio as any).browser) {
    url = window.location.href; // eslint-disable-line no-undef
    html = html || cheerio.html();
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
  } catch {
    return {
      type: 'error',
      message:
        'The url parameter passed does not look like a valid URL. Please check your URL and try again.',
    };
  }

  const resource = await Resource.create(url, html, parsedUrl, headers);

  // If we found an error creating the resource, return that error
  if ('type' in resource) {
    return resource;
  }

  const $ = resource;

  // Add custom extractor via cli.
  if (customExtractor) {
    addExtractor(customExtractor);
  }

  const extractor = getExtractor(url, parsedUrl, $);
  // console.log(`Using extractor for ${Extractor.domain}`);

  // if html still has not been set (i.e., url passed to parse),
  // set html from the response of Resource.create
  if (!html) {
    html = $.html();
  }

  // Cached value of every meta name in our document.
  // Used when extracting title/author/date_published/dek
  const metaCache = $('meta')
    .map((_, node) => $(node).attr('name'))
    .toArray() as unknown as string[];

  let extendedTypes = {};
  if (extend) {
    extendedTypes = selectExtendedTypes(extend, { $, url, html });
  }

  const extractionResult = RootExtractor.extract(extractor, {
    url,
    html,
    $: $ as cheerio.Root,
    metaCache,
    parsedUrl,
    fallback,
    contentType,
  });

  let result: Result;

  // Fetch more pages if next_page_url found
  if (
    extractionResult.type === 'full' &&
    fetchAllPages &&
    extractionResult.next_page_url
  ) {
    const pageResult = await collectAllPages({
      extractor,
      next_page_url: extractionResult.next_page_url,
      html,
      $,
      metaCache,
      result: extractionResult,
      title: extractionResult.title,
      url,
    });

    result = {
      ...pageResult,
      type: 'full',
    };
  } else {
    result = {
      ...extractionResult,
      total_pages: 1,
      pages_rendered: 1,
    };
  }

  if (contentType === 'markdown') {
    const turndownService = new TurndownService();
    result.content = turndownService.turndown(result.content ?? '');
  } else if (contentType === 'text') {
    // TODO: Fix cheerio .text types
    result.content = ($ as any).text($(result.content));
  }

  return { ...result, ...extendedTypes };
};

export const browser = !!(cheerio as any).browser;

/**
 * A convenience method for getting a resource
 * to work with, e.g., for custom extractor generator
 */
export const fetchResource = (url: string) => Resource.create(url);

export { addExtractor } from './extractors/add-extractor';
