import assert from 'assert';
import fs from 'fs';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

describe('NewYorkerExtractor', () => {
  it('is selected properly', () => {
    // To pass this test, rename your extractor in
    // ./src/extractors/custom/www.newyorker.com/index.js
    // (e.g., CustomExtractor => NYTimesExtractor)
    // then add your new extractor to
    // src/extractors/all.js
    const url =
      'http://www.newyorker.com/tech/elements/hacking-cryptography-and-the-countdown-to-quantum-computing';
    const extractor = getExtractor(url);
    assert.equal(extractor.domain, URL.parse(url).hostname);
  });

  it('returns the title', async () => {
    // To pass this test, fill out the title selector
    // in ./src/extractors/custom/www.newyorker.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.newyorker.com/1475248565793.html');
    const articleUrl =
      'http://www.newyorker.com/tech/elements/hacking-cryptography-and-the-countdown-to-quantum-computing';

    const { title } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(title, 'Hacking, Cryptography, and the Countdown to Quantum Computing');
  });


  it('returns the author', async () => {
    // To pass this test, fill out the author selector
    // in ./src/extractors/custom/www.newyorker.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.newyorker.com/1475248565793.html');
    const articleUrl =
      'http://www.newyorker.com/tech/elements/hacking-cryptography-and-the-countdown-to-quantum-computing';

    const { author } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(author, 'Alex Hutchinson');
  });


  it('returns the date_published', async () => {
    // To pass this test, fill out the date_published selector
    // in ./src/extractors/custom/www.newyorker.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.newyorker.com/1475248565793.html');
    const articleUrl =
      'http://www.newyorker.com/tech/elements/hacking-cryptography-and-the-countdown-to-quantum-computing';

    const { date_published } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(date_published, '2016-09-26T18:04:22.000Z');
  });


  it('returns the dek', async () => {
    // To pass this test, fill out the dek selector
    // in ./src/extractors/custom/www.newyorker.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.newyorker.com/1475248565793.html');
    const articleUrl =
      'http://www.newyorker.com/tech/elements/hacking-cryptography-and-the-countdown-to-quantum-computing';

    const { dek } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(dek, 'In a decade, events like the recent data breach at Yahoo could become much more common, driven by a new kind of machine.');
  });


  it('returns the lead_image_url', async () => {
    // To pass this test, fill out the lead_image_url selector
    // in ./src/extractors/custom/www.newyorker.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.newyorker.com/1475248565793.html');
    const articleUrl =
      'http://www.newyorker.com/tech/elements/hacking-cryptography-and-the-countdown-to-quantum-computing';

    const { lead_image_url } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(lead_image_url, 'http://www.newyorker.com/wp-content/uploads/2016/09/Hutchinson-Quantum-Computing-1200x630-1474903563.jpg');
  });

  it('returns the content', async () => {
    // To pass this test, fill out the content selector
    // in ./src/extractors/custom/www.newyorker.com/index.js.
    // You may also want to make use of the clean and transform
    // options.
    const html =
      fs.readFileSync('./fixtures/www.newyorker.com/1475248565793.html');
    const url =
      'http://www.newyorker.com/tech/elements/hacking-cryptography-and-the-countdown-to-quantum-computing';

    const { content } =
      await Mercury.parse(url, html, { fallback: false });

    const $ = cheerio.load(content || '');

    const first13 = excerptContent($('*').first().text(), 13);

    // Update these values with the expected values from
    // the article.
    assert.equal(first13, 'In a laboratory in Shanghai, researchers work on developing a quantum computer—a new');
  });
});
