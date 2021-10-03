/// <reference types="cheerio" />
export declare function scoreImageUrl(url: string): number;
export declare function scoreAttr($img: cheerio.Cheerio): 0 | 5;
export declare function scoreByParents($img: cheerio.Cheerio): number;
export declare function scoreBySibling($img: cheerio.Cheerio): number;
export declare function scoreByDimensions($img: cheerio.Cheerio): number;
export declare function scoreByPosition($imgs: cheerio.Element[], index: number): number;
