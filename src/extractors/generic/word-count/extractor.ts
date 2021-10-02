import cheerio from 'cheerio';

import { normalizeSpaces } from '../../../utils/text';

export const GenericWordCountExtractor = {
  extract({ content }: { content: string }) {
    const $ = cheerio.load(content);
    const $content = $('div').first();

    const text = normalizeSpaces($content.text());
    return text.split(/\s/).length;
  },
};
