import assert from 'assert';

import { setAttr } from './set-attr';

describe('setAttr(node, attr, val)', () => {
  it('sets attrs for a raw cheerio node', () => {
    const cheerioNode = {
      tagName: 'someTag',
      attribs: {
        class: 'foo bar',
        id: 'baz bat',
      },
    };

    const node = setAttr(cheerioNode, 'class', 'foo');

    assert.equal(node.attribs.class, 'foo');
  });
});
