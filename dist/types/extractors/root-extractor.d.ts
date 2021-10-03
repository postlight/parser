/// <reference types="cheerio" />
import { CustomExtractor, Extend, ExtractorOptions, SelectedExtractOptions, FullExtractorResult, ContentExtractorResult } from './types';
export declare function cleanBySelectors($content: cheerio.Cheerio, $: cheerio.Root, { clean }: {
    clean?: string[];
}): cheerio.Cheerio;
export declare function transformElements($content: cheerio.Cheerio, $: cheerio.Root, { transforms, }: {
    transforms?: Record<string, string | ((node: cheerio.Cheerio, $: cheerio.Root) => unknown)>;
}): cheerio.Cheerio;
export declare function select(opts: SelectedExtractOptions): string | string[] | undefined;
export declare function selectExtendedTypes(extend: Extend, opts: Omit<SelectedExtractOptions, 'type'>): Record<string, string | string[]>;
export declare const RootExtractor: {
    extract(extractor: CustomExtractor | undefined, opts: ExtractorOptions): FullExtractorResult | ContentExtractorResult;
};
