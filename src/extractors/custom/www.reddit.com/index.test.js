import assert from 'assert';
import URL from 'url';
import cheerio from 'cheerio';
import moment from 'moment-timezone';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

const fs = require('fs');

describe('WwwRedditComExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url =
        'https://www.reddit.com/r/Showerthoughts/comments/awx46q/vanilla_becoming_the_default_flavour_of_ice_cream/';
      const html = fs.readFileSync('./fixtures/www.reddit.com.html');
      result = Mercury.parse(url, { html, fallback: false });
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
      // in ./src/extractors/custom/www.reddit.com/index.js.
      const { title } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        title,
        `Vanilla becoming the default flavour of ice cream is the greatest underdog story of all time.`
      );
    });

    it('returns the author', async () => {
      // To pass this test, fill out the author selector
      // in ./src/extractors/custom/www.reddit.com/index.js.
      const { author } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(author, 'u/benyacobi');
    });

    it('returns the date_published', async () => {
      // To pass this test, fill out the date_published selector
      // in ./src/extractors/custom/www.reddit.com/index.js.
      const { date_published } = await result;
      const newDatePublished = moment(date_published)
        .format()
        .split('T')[0];
      const expectedDate = moment()
        .subtract(4, 'years')
        .format()
        .split('T')[0];

      // Update these values with the expected values from
      // the article.
      assert.equal(newDatePublished, expectedDate);
    });

    it('returns the lead_image_url', async () => {
      const html = fs.readFileSync('./fixtures/www.reddit.com--image.html');
      const uri =
        'https://www.reddit.com/r/aww/comments/aybw1m/nothing_to_see_here_human/';

      // To pass this test, fill out the lead_image_url selector
      // in ./src/extractors/custom/www.reddit.com/index.js.
      const { lead_image_url } = await Mercury.parse(uri, { html });

      // Update these values with the expected values from
      // the article.
      assert.equal(
        lead_image_url,
        'https://preview.redd.it/jsc4t74psok21.jpg?auto=webp&s=9c9826487e34d399333f65beb64390206fff4125'
      );
    });

    it('returns the content for text posts', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/www.reddit.com/index.js.
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
        'Edit: thank you for educating me about the ubiquity of vanilla. Still, none'
      );
    });

    it('handles posts that only have a title', async () => {
      const html = fs.readFileSync(
        './fixtures/www.reddit.com--title-only.html'
      );
      const uri =
        'https://www.reddit.com/r/AskReddit/comments/axtih6/what_is_the_most_worth_it_item_you_have_ever/';

      const { content } = await Mercury.parse(uri, { html });

      const $ = cheerio.load(content || '');

      const first13 = excerptContent(
        $('*')
          .first()
          .text(),
        13
      );

      assert.equal(first13, '');
    });

    it('handles image posts', async () => {
      const html = fs.readFileSync('./fixtures/www.reddit.com--image.html');
      const uri =
        'https://www.reddit.com/r/aww/comments/aybw1m/nothing_to_see_here_human/';

      const { content } = await Mercury.parse(uri, { html });

      const $ = cheerio.load(content || '');

      const image = $(
        'img[src="https://preview.redd.it/jsc4t74psok21.jpg?width=960&crop=smart&auto=webp&s=54349b21ff628e8c22c053509e86ba84ff9751d3"]'
      );

      assert.equal(image.length, 1);
    });

    it('handles video posts', async () => {
      const html = fs.readFileSync('./fixtures/www.reddit.com--video.html');
      const uri =
        'https://www.reddit.com/r/HumansBeingBros/comments/aybtf7/thanks_human/';

      const { content } = await Mercury.parse(uri, { html });

      const $ = cheerio.load(content || '');

      const video = $('video');

      assert.equal(video.length, 1);
    });

    it('handles external link posts with image preview', async () => {
      const html = fs.readFileSync(
        './fixtures/www.reddit.com--external-link.html'
      );

      const uri =
        'https://www.reddit.com/r/todayilearned/comments/aycizd/til_that_when_jrr_tolkiens_son_michael_signed_up/';

      const { content } = await Mercury.parse(uri, { html });

      const $ = cheerio.load(content || '');

      const link = $(
        'a[href="https://www.1843magazine.com/culture/look-closer/tolkiens-drawings-reveal-a-wizard-at-work"]'
      );

      const image = $(
        'img[src="https://b.thumbs.redditmedia.com/mZhJhz9fAxHzdGRcA-tbCa06IieIIuI0YWfdSYQa3Uk.jpg"]'
      );

      assert.equal(link.length, 2);

      assert.equal(image.length, 1);
    });

    it('handles external image posts with image preview', async () => {
      const html = fs.readFileSync(
        './fixtures/www.reddit.com--external-image.html'
      );
      const uri =
        'https://www.reddit.com/r/gifs/comments/4vv0sa/leonardo_dicaprio_scaring_jonah_hill_on_the/';

      const { content } = await Mercury.parse(uri, { html });

      const $ = cheerio.load(content || '');

      const link = $('a[href="http://i.imgur.com/Qcx1DSD.gifv"]');

      const video = $('video');

      assert.equal(link.length, 1);

      assert.equal(video.length, 1);
    });

    it('handles external link posts with embedded media', async () => {
      const html = fs.readFileSync('./fixtures/www.reddit.com--embedded.html');
      const uri =
        'https://www.reddit.com/r/videos/comments/5gafop/rick_astley_never_gonna_give_you_up_sped_up_every/';

      const { content } = await Mercury.parse(uri, { html });

      const $ = cheerio.load(content || '');

      const link = $('a[href="https://youtu.be/dQw4w9WgXcQ"]');

      const embed = $(
        'iframe[src^="https://www.redditmedia.com/mediaembed/5gafop"]'
      );

      assert.equal(link.length, 1);

      assert.equal(embed.length, 1);
    });
  });
});
