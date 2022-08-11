import assert from 'assert';
import cheerio from 'cheerio';

import extractFromSelectors from './extract-from-selectors';

describe('extractFromSelectors($, selectors, maxChildren, textOnly)', () => {
  it('extracts an arbitrary node by selector', () => {
    const $ = cheerio.load(`
      <html>
        <div class="author">Adam</div>
      </html>
    `);

    assert.equal(extractFromSelectors($, ['.author']), 'Adam');
  });

  it('ignores comments', () => {
    const $ = cheerio.load(`
      <html>
        <div class="comments-section">
          <div class="author">Adam</div>
        </div>
      </html>`);

    assert.equal(extractFromSelectors($, ['.author']), null);
  });

  it('skips a selector if it matches multiple nodes', () => {
    const $ = cheerio.load(`
      <html>
        <div>
          <div class="author">Adam</div>
          <div class="author">Adam</div>
        </div>
      </html>
    `);

    assert.equal(extractFromSelectors($, ['.author']), null);
  });

  it('skips a node with too many children', () => {
    const $ = cheerio.load(`
      <html>
        <div>
          <div class="author">
            <span>Adam</span>
            <span>Pash</span>
          </div>
        </div>
      </html>
    `);

    assert.equal(extractFromSelectors($, ['.author']), null);
  });
});
