/// <reference types="cheerio" />
export declare function cleanContent(article: cheerio.Cheerio, { $, title, url, defaultCleaner, }: {
    $: cheerio.Root;
    title?: string;
    url: string;
    defaultCleaner?: boolean;
}): cheerio.Cheerio;
