/// <reference types="cheerio" />
export declare function cleanDek(dek: cheerio.Cheerio, { $, excerpt }: {
    $: cheerio.Root;
    excerpt?: string;
}): string | undefined;
