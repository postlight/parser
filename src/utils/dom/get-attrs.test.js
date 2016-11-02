import assert from 'assert';

import getAttrs from './get-attrs';

describe('getAttrs(node)', () => {
  it('returns attrs for a raw jquery node', () => {
    const domNode = {
      attributes: {
        0: {
          name: 'class',
          value: 'foo bar',
        },
      },
    };

    const attrs = {
      class: 'foo bar',
    };

    assert.deepEqual(getAttrs(domNode), attrs);
  });

  it('returns attrs for a raw cheerio node', () => {
    const cheerioNode = {
      attribs: {
        class: 'foo bar',
        id: 'baz bat',
      },
    };

    assert.deepEqual(getAttrs(cheerioNode), cheerioNode.attribs);
  });
});
