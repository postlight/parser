import cheerio from 'cheerio';
import assert from 'assert';

import { assertClean } from 'test-helpers';

import HTML from './fixtures/html';
import rewriteTopLevel from './rewrite-top-level';

describe('rewriteTopLevel(node, $)', () => {
  it('turns html and body tags into divs', () => {
    const $ = cheerio.load(HTML.rewriteHTMLBody.before);
    const result = rewriteTopLevel($('html').first(), $);

    assert.equal(result('html').length, 0);
    assert.equal(result('body').length, 0);

    if (!cheerio.browser) {
      assertClean(result.html(), HTML.rewriteHTMLBody.after);
    }
  });
});
