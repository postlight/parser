import cheerio from 'cheerio';
import { ExtractorOptions } from './types';
export declare const GenericContentExtractor: {
    defaultOpts: {
        stripUnlikelyCandidates: boolean;
        weightNodes: boolean;
    };
    extract({ $, html, title, url, }: {
        $: cheerio.Root;
        html: string;
        title: string;
        url: string;
    }, opts?: ExtractorOptions | undefined): string | undefined;
    getContentNode($: cheerio.Root, title: string, url: string, opts: ExtractorOptions): cheerio.Cheerio;
    cleanAndReturnNode(node: cheerio.Cheerio, $: cheerio.Root): string | undefined;
};
