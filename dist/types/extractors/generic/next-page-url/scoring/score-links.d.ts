/// <reference types="cheerio" />
export declare function makeBaseRegex(baseUrl: string): RegExp;
export declare function scoreLinks({ links, articleUrl, baseUrl, parsedUrl, $, previousUrls, }: {
    links: cheerio.Element[];
    articleUrl: string;
    baseUrl: string;
    parsedUrl: URL;
    $: cheerio.Root;
    previousUrls: string[];
}): Record<string, {
    score: number;
    linkText: string;
    href: string;
}> | null;
