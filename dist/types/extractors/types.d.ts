/// <reference types="cheerio" />
export interface Extractor {
    domain: string;
    supportedDomains: string;
}
export interface InnerExtractorOptions {
    selectors?: Selector[];
    transforms?: Record<string, string | ((node: cheerio.Cheerio, $: cheerio.Root) => unknown)>;
    defaultCleaner?: boolean;
    allowMultiple?: boolean;
    clean?: string[];
}
export declare type DefaultContentType = 'content' | 'title' | 'date_published' | 'author' | 'next_page_url' | 'lead_image_url' | 'excerpt' | 'dek' | 'word_count' | 'direction' | 'url_and_domain';
export declare type CustomExtractor = {
    [Key in DefaultContentType]: InnerExtractorOptions;
} & {
    domain: string;
    supportedDomains?: string[];
    extend?: Extend;
};
export interface ExtractorOptions {
    $: cheerio.Root;
    html: string;
    url: string;
    extractHtml?: boolean;
    fallback?: boolean;
    contentOnly?: boolean;
    extractedTitle?: string;
    defaultCleaner?: boolean;
    parsedUrl?: URL;
    contentType?: string;
    previousUrls?: string[];
    metaCache: string[];
    excerpt?: string;
    extractionOpts?: InnerExtractorOptions | string;
}
export interface ExtractResultOptions extends ExtractorOptions {
    type: DefaultContentType;
    extractor: CustomExtractor;
    title?: string;
}
export interface SelectedExtractOptions {
    $: cheerio.Root;
    html: string;
    url: string;
    type: DefaultContentType;
    extractionOpts?: InnerExtractorOptions | string;
    extractHtml?: boolean;
}
export declare type CleanerOptions = SelectedExtractOptions & InnerExtractorOptions;
export declare type Selector = string | [string, string] | [string, string, (item: string) => string];
export interface Extend {
    [Key: string]: InnerExtractorOptions;
}
export interface ExtractorResult {
    next_page_url?: string;
    title: string;
    content?: string;
    author?: string;
    date_published?: string;
    dek?: undefined;
    lead_image_url?: string;
    url: string;
    domain?: string;
    excerpt: string;
    word_count: number;
    direction: 'ltr' | 'rtl';
}
export interface FullExtractorResult extends ExtractorResult {
    type: 'full';
}
export interface ContentExtractorResult {
    type: 'contentOnly';
    content?: string;
    next_page_url?: string;
}
