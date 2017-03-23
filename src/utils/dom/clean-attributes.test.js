import cheerio from 'cheerio';

import { assertClean } from 'test-helpers';

import HTML from './fixtures/html';
import { cleanAttributes } from './index';

describe('cleanAttributes($)', () => {
  it('removes style attributes from nodes', () => {
    const $ = cheerio.load(HTML.removeStyle.before);

    const result = cleanAttributes($('*').first(), $);
    assertClean($.html(result), HTML.removeStyle.after);
  });

  it('removes align attributes from nodes', () => {
    const $ = cheerio.load(HTML.removeAlign.before);

    const result = cleanAttributes($('*').first(), $);
    assertClean($.html(result), HTML.removeAlign.after);
  });
});
