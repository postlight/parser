import assert from 'assert';
import cheerio from 'cheerio';
import URL from 'url';

import getExtractor from 'extractors/get-extractor';
import Parser from 'mercury';
import { excerptContent } from 'utils/text';

const fs = require('fs');

describe('NewsYcombinatorComExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url = 'https://news.ycombinator.com/item?id=36817231';
      const html = fs.readFileSync(
        './fixtures/news.ycombinator.com/1690120617595.html'
      );
      result = Parser.parse(url, { html, fallback: false });
    });

    it('is selected properly', () => {
      // This test should be passing by default.
      // It sanity checks that the correct parser
      // is being selected for URLs from this domain
      const extractor = getExtractor(url);
      assert.equal(extractor.domain, URL.parse(url).hostname);
    });

    it('returns the title', async () => {
      // To pass this test, fill out the title selector
      // in ./src/extractors/custom/news.ycombinator.com/index.js.
      const { title } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        title,
        `Ask HN: What are the best papers you read in your life?`
      );
    });

    it('returns the author', async () => {
      // To pass this test, fill out the author selector
      // in ./src/extractors/custom/news.ycombinator.com/index.js.
      const { author } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(author, 'toombowoombo');
    });

    it('returns the content', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/news.ycombinator.com/index.js.
      // You may also want to make use of the clean and transform
      // options.
      const { content } = await result;

      const $ = cheerio.load(content || '');

      const first13 = excerptContent(
        $('*')
          .first()
          .text(),
        13
      );

      // Update these values with the expected values from
      // the article.
      assert.equal(
        first13,
        "I'm trying to get an understanding on what quality means in terms of"
      );
    });

    it('returns the comments', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/news.ycombinator.com/index.js.
      // You may also want to make use of the clean and transform
      // options.
      const { comments } = await result;

      const expectedNumberOfComments = 100;
      assert.equal(
        comments.length,
        expectedNumberOfComments,
        "didn't find the expected number of comments"
      );

      const first13 = excerptContent(comments[0] || '', 13);

      // Update these values with the expected values from
      // the article.
      assert.equal(
        first13,
        'Claude Shannon\'s "A Mathematical Theory of Communication"[1] is often considered a classic. I'
      );
    });
  });
});
