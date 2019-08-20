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
    it('counts words section', () => {
      const content = `
        <section>
          <p>One two three.</p>
          <p>Four five six.</p>
          <p>Seven eight nine.</p>
          <p>Ten eleven twelve.</p>
      `;

      const wordCount = GenericWordCountExtractor.extract({ content });

      assert.equal(wordCount, 12);
    });
    it('counts words article', () => {
      const content = `
        <article>
          <p>One two three.</p>
          <p>Four five six.</p>
          <p>Seven eight nine.</p>
          <p>Ten eleven twelve.</p>
      `;

      const wordCount = GenericWordCountExtractor.extract({ content });

      assert.equal(wordCount, 12);
    });
    it('counts words article', () => {
      const content = `
        <main>
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
