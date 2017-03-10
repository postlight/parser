import cheerio from 'cheerio';

import { normalizeSpaces } from 'utils/text';

const GenericWordCountExtractor = {
  extract({ content }, isHtml = true) {
    let text = normalizeSpaces(content);
    if (isHtml) {
      const $ = cheerio.load(content);
      const $content = $('div').first();

      text = normalizeSpaces($content.text());
    }
    return text.split(/\s/).length;
  },
};

export default GenericWordCountExtractor;
