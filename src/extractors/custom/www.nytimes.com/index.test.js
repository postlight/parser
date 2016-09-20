import assert from 'assert';
import fs from 'fs';
import cheerio from 'cheerio';

import Mercury from 'mercury';

describe('NYTimesExtractor', () => {
  it('works with a feature story', (async) () => {
    const html = fs.readFileSync('./fixtures/www.nytimes.com/1474061823854.html');
    const uri = 'http://www.nytimes.com/interactive/2016/09/15/arts/design/national-museum-of-african-american-history-and-culture.html';

    const { content, title, author } = await Mercury.parse(uri, html);
    const $ = cheerio.load(content);
    const text = $('*').first()
                       .text()
                       .trim()
                       .slice(0, 20);

    assert.equal(title, 'I, Too, Sing America');
    assert.equal(author, 'The New York Times');
    assert.equal(text, 'T he Smithsonian’s N');
  });

  it('works with a regular news story', (async) () => {
    const html = fs.readFileSync('./fixtures/www.nytimes.com/1474318141888.html');
    const uri = 'http://www.nytimes.com/2016/09/20/nyregion/nyc-nj-explosions-ahmad-khan-rahami.html';

    const { content, title, author } = await Mercury.parse(uri, html);
    const $ = cheerio.load(content);
    const text = $('*').first()
                       .text()
                       .trim()
                       .slice(0, 20);

    assert.equal(title, 'Ahmad Khan Rahami Is Arrested in Manhattan and New Jersey Bombings');
    assert.equal(author, 'MARC SANTORA, WILLIAM K. RASHBAUM, AL BAKER and ADAM GOLDMAN');
    assert.equal(text, 'The man believed to ');
  });
});
