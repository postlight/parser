/// <reference types="cheerio" />
export declare const GenericTitleExtractor: {
    extract({ $, url, metaCache, }: {
        $: cheerio.Root;
        url: string;
        metaCache: string[];
    }): string;
};
