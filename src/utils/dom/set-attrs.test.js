import assert from 'assert';

import { MockDomNode } from 'test-helpers';
import setAttrs from './set-attrs';

describe('setAttrs(node, attrs)', () => {
  it('sets attrs for a raw jquery node', () => {
    const attrs = {
      class: 'baz',
    };

    const postAttrs = [
      {
        name: 'class',
        value: 'baz',
      },
    ];

    const domNode = new MockDomNode();
    const node = setAttrs(domNode, attrs);

    assert.deepEqual(node.attributes, postAttrs);
  });

  it('sets attrs for a raw cheerio node', () => {
    const cheerioNode = {
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
