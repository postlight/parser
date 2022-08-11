import assert from 'assert';
import cheerio from 'cheerio';

import GenericTitleExtractor from './extractor';

describe('GenericTitleExtractor', () => {
  describe('extract({ $, url, cachedMeta })', () => {
    it('extracts strong meta title tags', () => {
      const $ = cheerio.load(`
      <html>
        <meta name="dc.title" value="This Is the Title Okay" />
      <html>
    `);
      const result = GenericTitleExtractor.extract({
        $,
        url: '',
        metaCache: ['dc.title', 'something-else'],
      });

      assert.equal(result, 'This Is the Title Okay');
    });

    it('pulls title from selectors lacking string meta', () => {
      const $ = cheerio.load(`
      <html>
        <article class="hentry">
          <h1 class="entry-title">This Is the Title Okay</h1>
        </article>
      <html>
    `);
      const result = GenericTitleExtractor.extract({
        $,
        url: '',
        metaCache: ['og:title', 'something-else'],
      });

      assert.equal(result, 'This Is the Title Okay');
    });

    it('then falls back to weak meta title tags', () => {
      const $ = cheerio.load(`
      <html>
        <meta name="og:title" value="This Is the Title Okay" />
      <html>
    `);
      const result = GenericTitleExtractor.extract({
        $,
        url: '',
        metaCache: ['og:title', 'something-else'],
      });

      assert.equal(result, 'This Is the Title Okay');
    });
  });

  it('then falls back to weak selectors', () => {
    const $ = cheerio.load(`
      <html>
        <head>
          <title>This Is the Weak Title Okay</title>
        </head>
      <html>
    `);
    const result = GenericTitleExtractor.extract({ $, url: '', metaCache: [] });

    assert.equal(result, 'This Is the Weak Title Okay');
  });
});
