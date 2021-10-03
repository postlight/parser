/// <reference types="cheerio" />
export declare function clean(content: string, maxLength?: number): string;
export declare const GenericExcerptExtractor: {
    extract({ $, content, metaCache, }: {
        $: cheerio.Root;
        content: string;
        metaCache: string[];
    }): string;
};
