import assert from 'assert';

import Iris from './iris';

describe('Iris', () => {
  describe('parse(url)', function test() {
    this.timeout(1000000);
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
      assert.equal(result.totalPages, 1);
      // console.log(result)
    });

    it('does ars pagination', async function() {
      const url = 'http://arstechnica.com/gadgets/2016/08/the-connected-renter-how-to-make-your-apartment-smarter/';
      const result = await Iris.parse(
        url,
        null,
        { fetchAllPages: true }
      );

      const { totalPages, pagesRendered } = result

      assert.equal(totalPages, 3)
      assert.equal(pagesRendered, 3)

      // console.log(result)
      assert.equal(result.nextPageUrl, `${url}2`);
      // console.log(result.content)
    });
  });
});
