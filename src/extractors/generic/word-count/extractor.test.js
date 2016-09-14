import assert from 'assert';

import GenericWordCountExtractor from './extractor';

describe('GenericWordCountExtractor', () => {
  describe('extact({ content })', () => {
    it('counts words', () => {
      const content = `
        <div>
          <p>One two three.</p>
          <p>Four five six.</p>
          <p>Seven eight nine.</p>
          <p>Ten eleven twelve.</p>
      `;

      const wordCount = GenericWordCountExtractor.extract({ content });

      assert.equal(wordCount, 12);
    });
  });
});
