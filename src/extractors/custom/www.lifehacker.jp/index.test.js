import assert from 'assert';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

const fs = require('fs');

describe('WwwLifehackerJpExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url =
        'https://www.lifehacker.jp/2019/03/amazon-fine-newspaper-stocker.html';
      const html = fs.readFileSync('./fixtures/www.lifehacker.jp.html');
      result = Mercury.parse(url, {
        html,
        fallback: false,
      });
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
      // in ./src/extractors/custom/www.lifehacker.jp/index.js.
      const { title } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        title,
        `ファインの新聞ストッカーは引越しにも使える！ 家具の固定も簡単`
      );
    });

    it('returns the author', async () => {
      // To pass this test, fill out the author selector
      // in ./src/extractors/custom/www.lifehacker.jp/index.js.
      const { author } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(author, '島津健吾');
    });

    it('returns the date_published', async () => {
      // To pass this test, fill out the date_published selector
      // in ./src/extractors/custom/www.lifehacker.jp/index.js.
      const { date_published } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(date_published, `2019-03-08T13:00:00.000Z`);
    });

    it('returns the dek', async () => {
      // To pass this test, fill out the dek selector
      // in ./src/extractors/custom/www.lifehacker.jp/index.js.
      const { dek } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(dek, null);
    });

    it('returns the lead_image_url', async () => {
      // To pass this test, fill out the lead_image_url selector
      // in ./src/extractors/custom/www.lifehacker.jp/index.js.
      const { lead_image_url } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        lead_image_url,
        `https://media.loom-app.com/mpp/lifehacker/dist/images/2019/02/28/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%882019-02-2810.48.32.jpg?w=1280&h=630&f=jpg`
      );
    });

    it('returns the content', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/www.lifehacker.jp/index.js.
      // You may also want to make use of the clean and transform
      // options.
      const { content } = await result;

      const $ = cheerio.load(content || '');

      const first13 = excerptContent(
        $('*')
          .first()
          .text(),
        2
      );

      // Update these values with the expected values from
      // the article.
      assert.equal(
        first13,
        'ついつい溜めてしまい、気がつくとかさばって捨てるのにも苦労する新聞紙。そんな新聞紙を捨てる時には、ファインの「新聞ストッカー」が役に立ちます。新聞紙を簡単に、くるくるっとテープでまけちゃうんです。Image: Amazon.co.jp使い方は簡単。テープや包帯を巻くようにぐるぐると巻きつけるだけ。普通だったら紐でまとめますが、下に通して、結んで、切って…と、結構時間がかかります。でも、このアイテムはラップフィルム。テープのように新聞に吸着してくれるので、きつく締めたり、結ぶ必要がありません。サクサクっとまとめられるので、時短になること間違いなしですね。Image:'
      );
    });
  });
});
