import assert from 'assert';
import cheerio from 'cheerio';
import URL from 'url';

import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';
import Mercury from 'mercury';

const fs = require('fs');

describe('NYTimesExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url =
        'https://www.nytimes.com/2016/09/20/nyregion/nyc-nj-explosions-ahmad-khan-rahami.html';
      const html = fs.readFileSync('./fixtures/www.nytimes.com.html');
      result = Mercury.parse(url, { html, fallback: false });
    });

    it('is selected properly', async () => {
      // To pass this test, rename your extractor in
      // ./src/extractors/custom/www.nytimes.com/index.js
      // (e.g., CustomExtractor => NYTimesExtractor)
      // then add your new extractor to
      // src/extractors/all.js
      const extractor = getExtractor(url);
      assert.equal(extractor.domain, URL.parse(url).hostname);
    });

    it('returns the title', async () => {
      // To pass this test, fill out the title selector
      // in ./src/extractors/custom/www.nytimes.com/index.js.
      const { title } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        title,
        'Ahmad Khan Rahami Is Arrested in Manhattan and New Jersey Bombings'
      );
    });

    it('returns the author', async () => {
      // To pass this test, fill out the author selector
      // in ./src/extractors/custom/www.nytimes.com/index.js.
      const { author } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        author,
        'Marc Santora, William K. Rashbaum, Al Baker and Adam Goldman'
      );
    });

    it('returns the date_published', async () => {
      // To pass this test, fill out the date_published selector
      // in ./src/extractors/custom/www.nytimes.com/index.js.
      const { date_published } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(date_published, '2016-09-19T11:46:01.000Z');
    });

    it('returns the lead_image_url', async () => {
      // To pass this test, fill out the lead_image_url selector
      // in ./src/extractors/custom/www.nytimes.com/index.js.
      const { lead_image_url } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        lead_image_url,
        'https://static01.nyt.com/images/2016/09/20/nyregion/Manhunt/Manhunt-facebookJumbo-v2.jpg?year=2016&h=549&w=1050&s=a40dd9bd69012d95e8a76943424679f17908af4c8f7ad3a6585e0d50632fff4b&k=ZQJBKqZ0VN'
      );
    });

    it('returns the content', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/www.nytimes.com/index.js.
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
        'The man who the police said sowed terror across two states, setting off'
      );
    });
  });

  it('works with a feature story', async () => {
    const html = fs.readFileSync('./fixtures/www.nytimes.com--feature.html');
    const uri =
      'http://www.nytimes.com/interactive/2016/09/15/arts/design/national-museum-of-african-american-history-and-culture.html';

    const { content, title, author } = await Mercury.parse(uri, { html });
    const $ = cheerio.load(content);
    const text = excerptContent(
      $('*')
        .first()
        .text(),
      13
    );

    assert.equal(title, 'I, Too, Sing America');
    assert.equal(author, 'The New York Times');
    assert.equal(
      text,
      'T he Smithsonian’s National Museum of African American History and Culture opens on'
    );
  });

  it('returns the title on most recent articles', async () => {
    const html = fs.readFileSync('./fixtures/www.nytimes.com--recent.html');
    const uri =
      'https://www.nytimes.com/2018/10/09/us/politics/nikki-haley-united-nations.html';

    const { title } = await Mercury.parse(uri, { html });

    assert.equal(
      title,
      'Nikki Haley to Resign as Trump’s Ambassador to the U.N.'
    );
  });
});
