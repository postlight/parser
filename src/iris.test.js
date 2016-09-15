import assert from 'assert';
import { Errors } from 'utils';

import Iris from './iris';

describe('Iris', () => {
  describe('parse(url)', function test() {
    this.timeout(1000000);
    it('returns an error if a malformed url is passed', async function() {
      const error = await Iris.parse('foo.com');

      assert.equal(error, Errors.badUrl);
    });

    it('returns an error if a bad url is passed', async function() {
      const error = await Iris.parse('foo.com');

      assert.equal(error, Errors.badUrl);
    });

    it('does the whole thing', async function() {
      const result = await Iris.parse('http://theconcourse.deadspin.com/phyllis-schlafly-finally-croaks-1786219220');

      assert.equal(typeof result, 'object');
      // console.log(result)
    });

    it('does blogger', async function() {
      const result = await Iris.parse('https://googleblog.blogspot.com/2016/08/onhub-turns-one-today.html');

      assert.equal(typeof result, 'object');
    });

    it('does wikipedia', async function() {
      const result = await Iris.parse('https://en.wikipedia.org/wiki/Brihadeeswarar_Temple_fire');

      assert.equal(typeof result, 'object');
      // console.log(result)
    });

    it('does the nyt', async function() {
      const result = await Iris.parse('http://www.nytimes.com/2016/08/16/upshot/the-state-of-the-clinton-trump-race-is-it-over.html?_r=0');

      assert.equal(typeof result, 'object');
      assert.equal(result.total_pages, 1);
      // console.log(result)
    });

    it('does ars pagination', async function() {
      const url = 'http://arstechnica.com/gadgets/2016/08/the-connected-renter-how-to-make-your-apartment-smarter/';
      const result = await Iris.parse(
        url,
        null,
        { fetchAllPages: true }
      );

      const { total_pages, pages_rendered } = result;

      assert.equal(total_pages, 3);
      assert.equal(pages_rendered, 3);

      // console.log(result)
      assert.equal(result.next_page_url, `${url}2`);
      // console.log(result.content)
    });
  });
});
