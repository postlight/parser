import assert from 'assert';

import cleanAuthor from './author';

describe('cleanAuthor(author)', () => {
  it('removes the By from an author string', () => {
    const author = cleanAuthor('By Bob Dylan');

    assert.equal(author, 'Bob Dylan');
  });

  it('trims trailing whitespace and line breaks', () => {
    const text = `
      written by
      Bob Dylan
    `;
    const author = cleanAuthor(text);

    assert.equal(author, 'Bob Dylan');
  });
});
