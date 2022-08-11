import assert from 'assert';
import cheerio from 'cheerio';

import { extractFromMeta } from './index';

describe('extractFromMeta($, metaNames, cachedNames, cleanTags)', () => {
  it('extracts an arbitrary meta tag by name', () => {
    const $ = cheerio.load(`
      <html>
        <meta name="foo" value="bar" />
      </html>
    `);
    const result = extractFromMeta($, ['foo', 'baz'], ['foo', 'bat']);

    assert.equal(result, 'bar');
  });

  it('returns nothing if a meta name is duplicated', () => {
    const $ = cheerio.load(`
      <html>
        <meta name="foo" value="bar" />
        <meta name="foo" value="baz" />
      </html>
    `);
    const result = extractFromMeta($, ['foo', 'baz'], ['foo', 'bat']);

    assert.equal(result, null);
  });

  it('ignores duplicate meta names with empty values', () => {
    const $ = cheerio.load(`
      <html>
        <meta name="foo" value="bar" />
        <meta name="foo" value="" />
      </html>
    `);
    const result = extractFromMeta($, ['foo', 'baz'], ['foo', 'bat']);

    assert.equal(result, 'bar');
  });
});
