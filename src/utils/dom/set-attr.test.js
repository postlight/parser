import assert from 'assert';

import { MockDomNode } from 'test-helpers';
import setAttr from './set-attr';

describe('setAttr(node, attr, val)', () => {
  it('sets attrs for a raw jquery node', () => {
    const domNode = new MockDomNode();

    const node = setAttr(domNode, 'class', 'foo');

    assert.equal(node.attributes[0].value, 'foo');
  });

  it('sets attrs for a raw cheerio node', () => {
    const cheerioNode = {
      attribs: {
        class: 'foo bar',
        id: 'baz bat',
      },
    };

    const node = setAttr(cheerioNode, 'class', 'foo');

    assert.equal(node.attribs.class, 'foo');
  });
});
