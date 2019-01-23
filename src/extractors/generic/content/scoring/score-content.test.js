import assert from 'assert';
import cheerio from 'cheerio';

import HTML from './fixtures/html';

import { scoreContent, getScore } from './index';

const fs = require('fs');

// TODO: Walk through these and sanity check my scores
// Commented out scores were what I expected, but I was also
// probably missing something when calculating
describe('scoreContent($, weightNodes)', () => {
  it('loves hNews content', () => {
    const $ = cheerio.load(HTML.hNews.before);
    scoreContent($);

    assert.equal(getScore($('div').first()), 140);
  });

  it('is so-so about non-hNews content', () => {
    const $ = cheerio.load(HTML.nonHNews.before);
    scoreContent($).html();

    assert.equal(getScore($('div').first()), 65);
  });

  it('scores this Wired article the same', () => {
    const html = fs.readFileSync('./fixtures/wired.html', 'utf-8');
    const $ = cheerio.load(html);
    scoreContent($).html();

    assert.equal(getScore($('article').first()), 65.5);
  });

  it('scores this Vulture article', () => {
    const html = fs.readFileSync('./fixtures/vulture.html', 'utf-8');
    let $ = cheerio.load(html);
    $ = scoreContent($);

    assert.equal($('p[score]').length, 62);
    const itemprop = $('[itemprop=articleBody]').first();

    // fuzzines of test below addressing minor
    // discrepancy b/w node and browser
    assert.equal(getScore(itemprop) > 500, true);
  });

  it('gives its parent all of the children scores', () => {
    const html = `
      <div score="0">
        <div score="0">
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type 
            specimen book.
          </p>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type 
            specimen book.
          </p>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type 
            specimen book.
          </p>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type 
            specimen book.
          </p>
        </div>
      </div>
    `;
    let $ = cheerio.load(html);
    $ = scoreContent($);

    assert.equal(
      $('p')
        .first()
        .attr('score'),
      '5'
    );
    assert.equal($('div div').attr('score'), '30');
  });
});
