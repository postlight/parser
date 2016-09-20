import assert from 'assert';
import fs from 'fs';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';

// Rename CustomExtractor
describe('CustomExtractor', () => {
  it('is selected properly', () => {
    // To pass this test, rename your extractor in
    // ./src/extractors/custom/www.theatlantic.com/index.js
    // then add your new extractor to
    // src/extractors/all.js
    const url = 'http://www.theatlantic.com/technology/archive/2016/09/why-new-yorkers-got-a-push-alert-about-a-manhunt/500591/';
    const extractor = getExtractor(url);
    assert.equal(extractor.domain, URL.parse(url).hostname)
  })

  it('works with a starter story', (async) () => {
    // To pass this test, begin filling out your
    // selectors in ./src/extractors/custom/www.theatlantic.com/index.js. This test is just
    // a stub; you can add more fields to test as much of
    // your parser as possible.
    const html = fs.readFileSync('./fixtures/www.theatlantic.com/1474321707642.html');
    const uri = 'http://www.theatlantic.com/technology/archive/2016/09/why-new-yorkers-got-a-push-alert-about-a-manhunt/500591/';

    const { content, title, author } = await Mercury.parse(uri, html);
    const $ = cheerio.load(content);
    const text = $('*').first()
                       .text()
                       .trim()
                       .slice(0, 20);

    assert.equal(title, 'Why New Yorkers Received a Push Alert About a Manhunt');
    assert.equal(author, 'Kaveh Waddell');
    assert.equal(text, 'Updated on September');
  });
});
