import assert from 'assert';
import excerptContent from './excerpt-content';

describe('excerptContent(content, words)', () => {
  it('extracts the requested number of words from content', () => {
    const content = ' One  two three four five six, seven eight, nine, ten.';

    const three = excerptContent(content, 3);
    assert.equal(three, 'One two three');

    const ten = excerptContent(content, 10);
    assert.equal(ten, content.trim().replace(/\s+/, ' '));
  });
});
