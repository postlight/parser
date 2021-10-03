/// <reference types="cheerio" />
export declare function cleanTitle(title: string, { url, $ }: {
    url: string;
    $: cheerio.Root;
}): string;
