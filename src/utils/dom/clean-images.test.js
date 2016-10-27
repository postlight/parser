import cheerio from 'cheerio';

import { assertClean } from 'test-helpers';

import HTML from './fixtures/html';
import { cleanImages } from './index';

describe('cleanImages($)', () => {
  it('removes images with small heights/widths', () => {
    const $ = cheerio.load(HTML.cleanSmallImages.before);

    const result = cleanImages($('*').first(), $);
    assertClean(result.html(), HTML.cleanSmallImages.after);
  });

  it('removes height attribute from images that remain', () => {
    const $ = cheerio.load(HTML.cleanHeight.before);

    const result = cleanImages($('*').first(), $);
    assertClean(result.html(), HTML.cleanHeight.after);
  });

  it('removes spacer/transparent images', () => {
    const $ = cheerio.load(HTML.cleanSpacer.before);

    const result = cleanImages($('*').first(), $);
    assertClean(result.html(), HTML.cleanSpacer.after);
  });
});
