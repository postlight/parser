import cheerio from 'cheerio';

import { normalizeSpaces } from 'utils/text';

const GenericWordCountExtractor = {
  extract({ content }) {
    const $ = cheerio.load(content);
    const $content = $('div').first();

    const text = normalizeSpaces($content.text());
    return text.split(/\s/).length;
  },
};

export default GenericWordCountExtractor;
