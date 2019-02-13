import assert from 'assert';
import { Errors } from 'utils';

import { record } from 'test-helpers';
import Mercury from './mercury';

const fs = require('fs');

describe('Mercury', () => {
  const recorder = record('mercury-test');
  beforeAll(recorder.before);
  afterAll(recorder.after);

  describe('parse(url)', () => {
    it('returns an error if a malformed url is passed', async () => {
      const error = await Mercury.parse('foo.com');

      assert.equal(error, Errors.badUrl);
    });

    it('returns an error if a bad url is passed', async () => {
      const error = await Mercury.parse('foo.com');

      assert.equal(error, Errors.badUrl);
    });

    it('does the whole thing', async () => {
      const result = await Mercury.parse(
        'http://deadspin.com/remember-when-donald-trump-got-booed-for-butchering-ta-1788216229'
      );

      assert.equal(typeof result, 'object');
      assert.equal(result.content.indexOf('score="') === -1, true);
    });

    it('does blogger', async () => {
      const result = await Mercury.parse(
        'https://googleblog.blogspot.com/2016/08/onhub-turns-one-today.html'
      );

      assert.equal(typeof result, 'object');
    });

    it('does blogger', async () => {
      const result = await Mercury.parse(
        'https://googleblog.blogspot.com/2016/08/onhub-turns-one-today.html'
      );

      assert.equal(typeof result, 'object');
    });

    it('does wikipedia', async () => {
      const result = await Mercury.parse(
        'https://en.wikipedia.org/wiki/Brihadeeswarar_Temple_fire'
      );

      assert.equal(typeof result, 'object');
    });

    it('does washingtonpost', async () => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
      const result = await Mercury.parse(
        'https://www.washingtonpost.com/news/opinions/wp/2018/10/29/enough-platitudes-lets-name-names/'
      );

      assert.equal(typeof result, 'object');
      assert.equal(result.total_pages, 1);
      assert.equal(
        result.url,
        'https://www.washingtonpost.com/news/opinions/wp/2018/10/29/enough-platitudes-lets-name-names/'
      );
    });

    it('does the nyt', async () => {
      const result = await Mercury.parse(
        'http://www.nytimes.com/2016/08/16/upshot/the-state-of-the-clinton-trump-race-is-it-over.html?_r=0'
      );

      assert.equal(typeof result, 'object');
      assert.equal(result.total_pages, 1);
    });

    it('does ars pagination', async () => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
      const url =
        'https://arstechnica.com/gadgets/2016/08/the-connected-renter-how-to-make-your-apartment-smarter/';
      const result = await Mercury.parse(url, { fetchAllPages: true });

      const { total_pages, pages_rendered } = result;

      assert.equal(total_pages, 3);
      assert.equal(pages_rendered, 3);

      assert.equal(result.next_page_url, `${url}2`);
    });
  });

  it('returns text content if text is passed as contentType', async () => {
    const url =
      'http://nymag.com/daily/intelligencer/2016/09/trump-discussed-usd25k-donation-with-florida-ag-not-fraud.html';
    const html = fs.readFileSync(
      './src/extractors/custom/nymag.com/fixtures/test.html',
      'utf8'
    );
    const { content } = await Mercury.parse(url, { html, contentType: 'text' });

    const htmlRe = /<[a-z][\s\S]*>/g;

    assert.equal(htmlRe.test(content), false);
  });

  it('returns markdown if markdown is passed as contentType', async () => {
    const url =
      'http://nymag.com/daily/intelligencer/2016/09/trump-discussed-usd25k-donation-with-florida-ag-not-fraud.html';
    const html = fs.readFileSync(
      './src/extractors/custom/nymag.com/fixtures/test.html',
      'utf8'
    );
    const { content } = await Mercury.parse(url, {
      html,
      contentType: 'markdown',
    });

    const htmlRe = /<[a-z][\s\S]*>/;
    const markdownRe = /\[[\w\s]+\]\(.*\)/;

    assert.equal(htmlRe.test(content), false);
    assert.equal(markdownRe.test(content), true);
  });
});
