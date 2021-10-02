import assert from 'assert';

import { getAttrs } from './get-attrs';

describe('getAttrs(node)', () => {
  it('returns attrs for a raw cheerio node', () => {
    const cheerioNode = {
      tagName: 'string',
      attribs: {
        class: 'foo bar',
        id: 'baz bat',
      },
    };

    assert.deepEqual(getAttrs(cheerioNode), cheerioNode.attribs);
  });
});
