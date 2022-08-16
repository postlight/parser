import assert from 'assert';
import cheerio from 'cheerio';

import detectByHtml from './detect-by-html';

describe('detectByHtml', () => {
  it('detects a medium post from the html', () => {
    const $ = cheerio.load(
      '<head><meta name="al:ios:app_name" value="Medium" /></head>'
    );

    assert.equal(detectByHtml($).domain, 'medium.com');
  });

  it('returns nothing if no match is found', () => {
    const $ = cheerio.load('<div></div>');

    assert.equal(detectByHtml($), null);
  });
});
