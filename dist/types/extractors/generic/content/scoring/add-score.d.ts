/// <reference types="cheerio" />
export declare function addScore($node: cheerio.Cheerio, $: cheerio.Root, amount: number): cheerio.Cheerio;
export declare function addToParent(node: cheerio.Cheerio, $: cheerio.Root, score: number): cheerio.Cheerio;
/**  gets and returns the score if it exists
 * if not, initializes a score based on the
 * node's tag type
 */
export declare function getOrInitScore($node: cheerio.Cheerio, $: cheerio.Root, weightNodes?: boolean): number;
