import assert from 'assert';

import { clean } from 'test-helpers';

import GenericContentExtractor from './extractor';

const fs = require('fs');

describe('GenericContentExtractor', () => {
  describe('extract($, html, opts)', () => {
    it('extracts html and returns the article', () => {
      const html = fs.readFileSync('./fixtures/vulture.html', 'utf-8');
      const result = clean(
        GenericContentExtractor.extract({
          $: null,
          html,
          url:
            'http://www.vulture.com/2016/08/dc-comics-greg-berlanti-c-v-r.html',
        })
      );

      assert(typeof result, 'string');
    });
  });
});
