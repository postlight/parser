import assert from 'assert';
import cheerio from 'cheerio';

import normalizeMetaTags from './normalize-meta-tags';

describe('normalizeMetaTags($)', () => {
  it('replaces "content" attributes with "value"', () => {
    // browser cheerio/jquery will remove/replace html, so result is different
    const test = cheerio.browser
      ? '<meta name="foo" value="bar">'
      : '<html><meta name="foo" value="bar"></html>';

    const $ = cheerio.load('<html><meta name="foo" content="bar"></html>');
    const result = normalizeMetaTags($).html();

    assert.equal(result, test);
  });

  it('replaces "property" attributes with "name"', () => {
    const test = cheerio.browser
      ? '<meta value="bar" name="foo">'
      : '<html><meta value="bar" name="foo"></html>';

    const $ = cheerio.load('<html><meta property="foo" value="bar"></html>');
    const result = normalizeMetaTags($).html();

    assert.equal(result, test);
  });
});
