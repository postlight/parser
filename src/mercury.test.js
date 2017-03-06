import assert from 'assert';
import { Errors } from 'utils';

import { record } from 'test-helpers';
import Mercury from './mercury';

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

    it('text file URL', async () => {
      const result = await Mercury.parse('https://www.bvestation.com/worktest/text.txt');

      // assert.equal(error, Errors.badUrl);
    });

    it('does the whole thing', async () => {
      const result =
        await Mercury.parse('http://deadspin.com/remember-when-donald-trump-got-booed-for-butchering-ta-1788216229');
      assert.equal(typeof result, 'object');
      assert.equal(result.content.indexOf('score="') === -1, true);
    });

    it('does blogger', async () => {
      const result =
        await Mercury.parse('https://googleblog.blogspot.com/2016/08/onhub-turns-one-today.html');

      assert.equal(typeof result, 'object');
    });

    it('does blogger', async () => {
      const result = await Mercury.parse('https://googleblog.blogspot.com/2016/08/onhub-turns-one-today.html');

      assert.equal(typeof result, 'object');
    });

    it('does wikipedia', async () => {
      const result = await Mercury.parse('https://en.wikipedia.org/wiki/Brihadeeswarar_Temple_fire');

      assert.equal(typeof result, 'object');
    });

    it('does the nyt', async () => {
      const result = await Mercury.parse('http://www.nytimes.com/2016/08/16/upshot/the-state-of-the-clinton-trump-race-is-it-over.html?_r=0');

      assert.equal(typeof result, 'object');
      assert.equal(result.total_pages, 1);
    });

    it('does ars pagination', async () => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
      const url = 'http://arstechnica.com/gadgets/2016/08/the-connected-renter-how-to-make-your-apartment-smarter/';
      const result = await Mercury.parse(
        url,
        null,
        { fetchAllPages: true }
      );

      const { total_pages, pages_rendered } = result;

      assert.equal(total_pages, 3);
      assert.equal(pages_rendered, 3);

      assert.equal(result.next_page_url, `${url}2`);
    });
  });
});
