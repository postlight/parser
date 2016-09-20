import assert from 'assert';
import fs from 'fs';

import { clean } from 'test-helpers';

import GenericContentExtractor from './extractor';

describe('GenericContentExtractor', function () {
  describe('extract($, html, opts)', () => {
    it('extracts html and returns the article', () => {
      const html = fs.readFileSync('./fixtures/vulture.html', 'utf-8');

      // Array.from(range(1, 100)).map((i) => {
      //   console.log(i)
      //   clean(GenericContentExtractor.extract(
      //     { $: null, html, url: 'http://example.com' }
      //   ))
      // })
      const result = clean(GenericContentExtractor.extract(
        { $: null, html, url: 'http://www.vulture.com/2016/08/dc-comics-greg-berlanti-c-v-r.html' }
      ));

      assert(typeof result, 'string');
      // console.log(result)
    });
  });
});
