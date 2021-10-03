/// <reference types="cheerio" />
import { ErrorResult, Options, Result } from './types';
export declare const parse: (url: string, { html, extend, customExtractor, ...opts }?: Options | undefined) => Promise<Result | ErrorResult>;
export declare const browser: boolean;
/**
 * A convenience method for getting a resource
 * to work with, e.g., for custom extractor generator
 */
export declare const fetchResource: (url: string) => Promise<cheerio.Root | import("./resource/utils/fetch-resource").ErrorResult>;
export { addExtractor } from './extractors/add-extractor';
