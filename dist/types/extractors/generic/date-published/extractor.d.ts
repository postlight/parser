/// <reference types="cheerio" />
export declare const GenericDatePublishedExtractor: {
    extract({ $, url, metaCache, }: {
        $: cheerio.Root;
        url: string;
        metaCache: string[];
    }): string | undefined;
};
