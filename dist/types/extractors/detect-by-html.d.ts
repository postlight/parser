/// <reference types="cheerio" />
export declare function detectByHtml($: cheerio.Root): {
    domain: string;
    title: {
        selectors: (string | string[])[];
    };
    author: {
        selectors: string[][];
    };
    content: {
        selectors: string[];
        transforms: {
            iframe: ($node: any) => void;
            figure: ($node: any) => void;
            img: ($node: any) => void;
        };
        clean: string[];
    };
    date_published: {
        selectors: string[][];
    };
    lead_image_url: {
        selectors: string[][];
    };
    dek: null;
    next_page_url: {
        selectors: never[];
    };
    excerpt: {
        selectors: never[];
    };
} | {
    domain: string;
    content: {
        selectors: string[];
        clean: never[];
        transforms: {
            noscript: string;
        };
    };
    author: {
        selectors: string[];
    };
    title: {
        selectors: string[];
    };
    date_published: {
        selectors: string[];
    };
} | undefined;
