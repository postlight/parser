/// <reference types="cheerio" />
export declare const GenericNextPageUrlExtractor: {
    extract({ $, url, parsedUrl, previousUrls, }: {
        $: cheerio.Root;
        url: string;
        parsedUrl?: URL | undefined;
        previousUrls?: string[] | undefined;
    }): string | undefined;
};
