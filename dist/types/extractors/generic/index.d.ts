/// <reference types="jquery" />
import cheerio from 'cheerio';
import { ExtractorResult } from '../types';
export declare const GenericExtractor: {
    domain: string;
    title: ({ $, url, metaCache, }: {
        $: cheerio.Root;
        url: string;
        metaCache: string[];
    }) => string;
    date_published: ({ $, url, metaCache, }: {
        $: cheerio.Root;
        url: string;
        metaCache: string[];
    }) => string | undefined;
    author: ({ $, metaCache, }: {
        $: cheerio.Root;
        metaCache: string[];
    }) => string | undefined;
    content: ({ $, html, title, url, }: {
        $: cheerio.Root;
        html: string;
        title: string;
        url: string;
    }, opts?: import("./content/types").ExtractorOptions | undefined) => string | undefined;
    lead_image_url: ({ $, content, metaCache, html, }: {
        $: cheerio.Root;
        content: string;
        metaCache: string[];
        html: string;
    }) => string | undefined;
    dek: (args: any) => undefined;
    next_page_url: ({ $, url, parsedUrl, previousUrls, }: {
        $: cheerio.Root;
        url: string;
        parsedUrl?: URL | undefined;
        previousUrls?: string[] | undefined;
    }) => string | undefined;
    url_and_domain: ({ $, url, metaCache, }: {
        $: cheerio.Root;
        url: string;
        metaCache: string[];
    }) => {
        url: string;
        domain: string;
    };
    excerpt: ({ $, content, metaCache, }: {
        $: cheerio.Root;
        content: string;
        metaCache: string[];
    }) => string;
    word_count: ({ content }: {
        content: string;
    }) => number;
    direction: ({ title }: {
        title: string;
    }) => "ltr" | "rtl";
    extract(options: {
        $: cheerio.Root;
        html: string;
        url: string;
        parsedUrl?: URL;
        previousUrls?: string[];
        metaCache: string[];
    }): ExtractorResult;
};
