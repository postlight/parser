import assert from 'assert';

import setAttrs from './set-attrs';

describe('setAttrs(node, attrs)', () => {
  it('sets attrs for a raw jquery node', () => {
    const jqueryNode = {
      attributes: {
        class: 'foo bar',
        id: 'baz bat',
      },
    };

    const attrs = {
      class: 'baz',
      id: 'bar',
    }

    const node = setAttrs(jqueryNode, attrs)

    assert.deepEqual(node.attributes, attrs);
  })

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
    }

    const node = setAttrs(cheerioNode, attrs)

    assert.deepEqual(node.attribs, attrs);
  })

})


