import cheerio from 'cheerio';

import { assertClean } from 'test-helpers';

import HTML from './fixtures/html';
import { markToKeep } from './index';

describe('markToKeep($)', () => {
  it('marks elements that should be kept', () => {
    const $ = cheerio.load(HTML.marksYouTube.before);

    const result = markToKeep($('*').first(), $);
    assertClean(result.html(), HTML.marksYouTube.after);
  });
});

