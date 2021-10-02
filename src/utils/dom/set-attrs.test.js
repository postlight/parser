import assert from 'assert';

import { setAttrs } from './set-attrs';

describe('setAttrs(node, attrs)', () => {
  it('sets attrs for a raw cheerio node', () => {
    const cheerioNode = {
      tagName: 'tag',
      attribs: {
        class: 'foo bar',
        id: 'baz bat',
      },
    };

    const attrs = {
      class: 'baz',
      id: 'bar',
    };

    const node = setAttrs(cheerioNode, attrs);

    assert.deepEqual(node.attribs, attrs);
  });
});
