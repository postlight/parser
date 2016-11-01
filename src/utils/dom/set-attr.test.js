import assert from 'assert';

import setAttr from './set-attr';

describe('setAttr(node, attr, val)', () => {
  it('sets attrs for a raw jquery node', () => {
    const jqueryNode = {
      attributes: {
        class: 'foo bar',
        id: 'baz bat',
      },
    };

    const node = setAttr(jqueryNode, 'class', 'foo')

    assert.equal(node.attributes.class, 'foo');
  })

  it('sets attrs for a raw cheerio node', () => {
    const cheerioNode = {
      attributes: {
        class: 'foo bar',
        id: 'baz bat',
      },
    };

    const node = setAttr(cheerioNode, 'class', 'foo')

    assert.equal(node.attributes.class, 'foo');
  })
})

