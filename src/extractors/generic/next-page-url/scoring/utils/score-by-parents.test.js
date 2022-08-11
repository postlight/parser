import assert from 'assert';
import cheerio from 'cheerio';

import scoreByParents from './score-by-parents';

describe('scoreByParents($link)', () => {
  it('returns 25 if parent sig looks like a page', () => {
    const $ = cheerio.load(`
      <div>
        <div class="next-page">
          <a href="blah">Next page</a>
        </div>
      </div>
    `);

    assert.equal(scoreByParents($('a').first()), 25);
  });

  it('returns -25 if parent sig looks like a comment', () => {
    const $ = cheerio.load(`
      <div>
        <div class="comment">
          <a href="blah">Next page</a>
        </div>
      </div>
    `);

    assert.equal(scoreByParents($('a').first()), -25);
  });
});
