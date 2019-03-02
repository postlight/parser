import assert from 'assert';
import cheerio from 'cheerio';

import detectByHtml from './detect-by-html';

describe('detectByHtml', () => {
  it('detects a medium post from the html', () => {
    const html = '<head><meta name="al:ios:app_name" value="Medium" /></head>';

    const $ = cheerio.load(html);

    assert.equal(detectByHtml($).domain, 'medium.com');
  });

  it('returns nothing if no match is found', () => {
    const html = '<div></div>';

    const $ = cheerio.load(html);

    assert.equal(detectByHtml($), null);
  });
});
