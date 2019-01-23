import assert from 'assert';
import cheerio from 'cheerio';

import GenericExcerptExtractor, { clean } from './extractor';

describe('GenericExcerptExtractor', () => {
  describe('extract({ $, content, metaCache })', () => {
    it('returns og:description', () => {
      const actualExcerpt = 'Wow this is going to be something good.';
      const html = `
        <html>
          <head>
            <meta name="og:description" value="${actualExcerpt}" />
          </head>
        </html>
      `;
      const $ = cheerio.load(html);
      const metaCache = ['og:description'];

      const excerpt = GenericExcerptExtractor.extract({
        $,
        content: '',
        metaCache,
      });

      assert.equal(excerpt, actualExcerpt);
    });

    it('returns twitter:description', () => {
      const actualExcerpt = 'Wow this is going to be something good.';
      const html = `
        <html>
          <head>
            <meta name="twitter:description" value="${actualExcerpt}" />
          </head>
        </html>
      `;
      const $ = cheerio.load(html);
      const metaCache = ['twitter:description'];

      const excerpt = GenericExcerptExtractor.extract({
        $,
        content: '',
        metaCache,
      });

      assert.equal(excerpt, actualExcerpt);
    });

    it('falls back to the content', () => {
      const html = `
        <html>
          <head>
          </head>
        </html>
      `;
      const $ = cheerio.load(html);
      const content =
        '<div><p>Wow <b>this</b> is going to be something good.</p></div>';
      const metaCache = [];

      const excerpt = GenericExcerptExtractor.extract({
        $,
        content,
        metaCache,
      });

      assert.equal(excerpt, 'Wow this is going to be something good.');
    });
  });
});

describe('clean(text)', () => {
  it('truncates text longer than 200 chars and trims whitespance', () => {
    const longText = `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
      nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
      fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
      culpa qui officia deserunt mollit anim id est laborum.
    `;
    const text = clean(longText);
    let shouldBe = `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
      exercitation ullamco laboris nisi ut&hellip;
    `;
    shouldBe = shouldBe.replace(/[\s\n]+/g, ' ').trim();

    assert.equal(text, shouldBe);
  });
});
