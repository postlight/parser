import cheerio from 'cheerio';

import { normalizeSpaces } from 'utils/text';

const getWordCount = content => {
  const $ = cheerio.load(content);
  const $content = $('div').first();
  const text = normalizeSpaces($content.text());
  return text.split(/\s/).length;
};

const getWordCountAlt = content => {
  content = content.replace(/<[^>]*>/g, ' ');
  content = content.replace(/\s+/g, ' ');
  content = content.trim();
  return content.split(' ').length;
};

const GenericWordCountExtractor = {
  extract({ content }) {
    let count = getWordCount(content);
    if (count === 1) count = getWordCountAlt(content);
    return count;
  },
};

export default GenericWordCountExtractor;
