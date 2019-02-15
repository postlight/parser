import assert from 'assert';
import decodeEntities from './decode-entities';

describe('decodeEntities(str)', () => {
  it('decodes html entities', () => {
    const entityMap = {
      '&#162;': `¢`,
      '&#163;': `£`,
      '&#165;': `¥`,
      '&#169;': `©`,
      '&#38;': `&`,
      '&#60;': `<`,
      '&#62;': `>`,
      '&#8364;': `€`,
      '&amp;': `&`,
      '&cent;': `¢`,
      '&copy;': `©`,
      '&euro;': `€`,
      '&gt;': `>`,
      '&lt;': `<`,
      '&pound;': `£`,
      '&reg;': `®`,
      '&yen;': `¥`,
    };
    const entities = Object.keys(entityMap).join(' ');
    const characters = Object.values(entityMap).join(' ');

    assert.equal(decodeEntities(entities), characters);
  });

  it('Leaves non-ascii alone', () => {
    const str = '德 😀 ě';
    assert.equal(decodeEntities(str), str);
  });
});
