import cheerio from 'cheerio';

import { assertClean } from 'test-helpers';

import HTML from './fixtures/html';
import { stripJunkTags } from './index';

describe('stripJunkTags($)', () => {
  it('strips script and other junk tags', () => {
    const $ = cheerio.load(HTML.stripsJunk.before);

    const result = stripJunkTags($('*').first(), $);
    assertClean(result.html(), HTML.stripsJunk.after);
  });

  it('keeps youtube embeds', () => {
    const $ = cheerio.load(HTML.ignoresKeepable.before);

    const result = stripJunkTags($('*').first(), $);
    assertClean(result.html(), HTML.ignoresKeepable.after);
  });
});
