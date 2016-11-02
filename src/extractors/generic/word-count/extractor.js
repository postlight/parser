import cheerio from 'cheerio';

import { normalizeSpaces } from 'utils/text';

const GenericWordCountExtractor = {
  extract({ content }) {
    let $content;
    if (cheerio.load) {
      const $ = cheerio.load(content);
      $content = $('div').first();
    } else {
      const $ = cheerio;
      $content = $('<div />').prepend(content);
    }

    const text = normalizeSpaces($content.text());
    return text.split(/\s/).length;
  },
};

export default GenericWordCountExtractor;
