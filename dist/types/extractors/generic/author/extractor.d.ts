/// <reference types="cheerio" />
export declare const GenericAuthorExtractor: {
    extract({ $, metaCache, }: {
        $: cheerio.Root;
        metaCache: string[];
    }): string | undefined;
};
