/// <reference types="cheerio" />
export declare const GenericLeadImageUrlExtractor: {
    extract({ $, content, metaCache, html, }: {
        $: cheerio.Root;
        content: string;
        metaCache: string[];
        html: string;
    }): string | undefined;
};
