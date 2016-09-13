import assert from 'assert';
import cheerio from 'cheerio';

import stripTags from './strip-tags';

describe('stripTags(title, $)', () => {
  it('strips tags from a string of text', () => {
    const $ = cheerio.load('<div></div>');

    const result = stripTags('What a <em>Wonderful</em> Day', $);

    assert.equal(result, 'What a Wonderful Day');
  });

  it('returns the original text if no tags found', () => {
    const $ = cheerio.load('<div></div>');

    const result = stripTags('What a Wonderful Day', $);

    assert.equal(result, 'What a Wonderful Day');
  });
});
