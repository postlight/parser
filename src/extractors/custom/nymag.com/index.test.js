import assert from 'assert';

import Mercury from 'mercury';

const fs = require('fs');

describe('NYMagExtractor', () => {
  it('works with a feature story', async () => {
    const html = fs.readFileSync('./fixtures/nymag.com/ailes.html');
    const uri =
      'http://nymag.com/daily/intelligencer/2016/09/how-fox-news-women-took-down-roger-ailes.html';

    const { dek, title, author } = await Mercury.parse(uri, html);
    const actualDek =
      'How Fox News women took down the most powerful, and predatory, man in media.';

    assert.equal(dek, actualDek);
    assert.equal(title, 'The Revenge of Roger’s Angels');
    assert.equal(author, 'Gabriel Sherman');
  });
});
