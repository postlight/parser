import assert from 'assert';

import getHtml from './get-html';

describe('getHtml($, node)', () => {
  it('returns html if $ is cheerio', () => {
    const node = '<div></div>';
    const $ = {
      html: text => (
        text
      ),
    };

    assert.equal(getHtml($, node), node);
  });

  it('returns html if $ is jquery', () => {
    const html = '<div></div>';
    const $ = () => (
      {
        append: () => (
          {
            html: () => '<div></div>',
          }
        ),
      }
    );
    const node = {
      clone: () => null,

    };

    assert.equal(getHtml($, node), html);
  });
});
