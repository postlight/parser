import assert from 'assert';

import Mercury from 'mercury';

const fs = require('fs');

describe('TwitterExtractor', () => {
  it('works with a feature story', async () => {
    const html = fs.readFileSync('./fixtures/twitter.com/tweet.html');
    const uri = 'https://twitter.com/KingBeyonceStan/status/745276948213968896';

    const { title, author, date_published } = await Mercury.parse(uri, {
      html,
    });

    assert.equal(title, 'Lina Morgana on Twitter');
    assert.equal(author, '@KingBeyonceStan');
    assert.equal(date_published, '2016-06-21T15:27:25.000Z');
  });
});
