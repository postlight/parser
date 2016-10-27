import assert from 'assert';
import cheerio from 'cheerio';

import scoreByParents from './score-by-parents';

describe('scoreByParents($link)', () => {
  it('returns 25 if parent sig looks like a page', () => {
    const html = `
      <div>
        <div class="next-page">
          <a href="blah">Next page</a>
        </div>
      </div>
    `;
    const $ = cheerio.load(html);
    const $link = $('a').first();

    assert.equal(scoreByParents($link), 25);
  });

  it('returns -25 if parent sig looks like a comment', () => {
    const html = `
      <div>
        <div class="comment">
          <a href="blah">Next page</a>
        </div>
      </div>
    `;
    const $ = cheerio.load(html);
    const $link = $('a').first();

    assert.equal(scoreByParents($link), -25);
  });
});
