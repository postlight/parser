/// <reference types="cheerio" />
import { cleanAuthor } from './author';
import { cleanImage } from './lead-image-url';
import { cleanDek } from './dek';
import { cleanDatePublished } from './date-published';
import { cleanContent } from './content';
import { cleanTitle } from './title';
import { CleanerOptions } from '../extractors/types';
declare const InternalCleaners: {
    author: (input: cheerio.Cheerio) => string;
    lead_image_url: (input: cheerio.Cheerio) => string | undefined;
    dek: typeof cleanDek;
    date_published: (input: cheerio.Cheerio, rest_0?: {
        timezone?: string | undefined;
        format?: import("moment").MomentFormatSpecification | undefined;
    } | undefined) => string | undefined;
    content: (input: cheerio.Cheerio, opts: CleanerOptions) => string;
    title: (input: cheerio.Cheerio, rest_0: {
        url: string;
        $: cheerio.Root;
    }) => string;
};
declare type InternalCleaners = typeof InternalCleaners;
declare type Cleaners = {
    [Key in keyof InternalCleaners]: (input: cheerio.Cheerio, opts: CleanerOptions) => string | undefined;
};
export declare const Cleaners: Cleaners;
export { cleanAuthor };
export { cleanImage };
export { cleanDek };
export { cleanDatePublished };
export { cleanContent };
export { cleanTitle };
export { resolveSplitTitle } from './resolve-split-title';
