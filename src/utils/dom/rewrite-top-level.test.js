import cheerio from 'cheerio';
import assert from 'assert';

import { assertClean } from 'test-helpers';

import rewriteTopLevel from './rewrite-top-level';

describe('rewriteTopLevel(node, $)', () => {
  it('turns html and body tags into divs', () => {
    const $ = cheerio.load(`
        <html><body><div><p><a href="">Wow how about that</a></p></div></body></html>
    `);
    const result = rewriteTopLevel($('html').first(), $);

    assert.equal(result('html').length, 0);
    assert.equal(result('body').length, 0);

    if (!cheerio.browser) {
      assertClean(
        result.html(),
        `
        <div><div><div><p><a href="">Wow how about that</a></p></div></div></div>
      `
      );
    }
  });
});
