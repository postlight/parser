import { cleanAuthor } from './author';
import { cleanImage } from './lead-image-url';
import { cleanDek } from './dek';
import { cleanDatePublished } from './date-published';
import { cleanContent } from './content';
import { cleanTitle } from './title';
import { CleanerOptions, ExtractorOptions } from '../extractors/types';

const wrapStringMethodFromCheerio = <TReturn, TRest extends any[]>(
  func: (input: string, ...rest: TRest) => TReturn
) => (input: cheerio.Cheerio, ...rest: TRest) =>
  func(input.toString(), ...rest);

const InternalCleaners = {
  author: wrapStringMethodFromCheerio(cleanAuthor),
  lead_image_url: wrapStringMethodFromCheerio(cleanImage),
  dek: cleanDek,
  date_published: wrapStringMethodFromCheerio(cleanDatePublished),
  content: (input: cheerio.Cheerio, opts: CleanerOptions) =>
    cleanContent(input, opts).toString(),
  title: wrapStringMethodFromCheerio(cleanTitle),
};

type InternalCleaners = typeof InternalCleaners;

type Cleaners = {
  [Key in keyof InternalCleaners]: (
    input: cheerio.Cheerio,
    opts: CleanerOptions
  ) => string | undefined
};

export const Cleaners = InternalCleaners as Cleaners;

export { cleanAuthor };
export { cleanImage };
export { cleanDek };
export { cleanDatePublished };
export { cleanContent };
export { cleanTitle };
export { resolveSplitTitle } from './resolve-split-title';
