/// <reference types="cheerio" />
export declare const GenericUrlExtractor: {
    extract({ $, url, metaCache, }: {
        $: cheerio.Root;
        url: string;
        metaCache: string[];
    }): {
        url: string;
        domain: string;
    };
};
