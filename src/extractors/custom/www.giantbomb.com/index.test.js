import assert from 'assert';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

const fs = require('fs');

describe('WwwGiantbombComExtractor', () => {
  it('video', async () => {
    const html = fs.readFileSync(
      './fixtures/www.giantbomb.com/1590071618051.html'
    );
    const uri =
      'https://www.giantbomb.com/videos/2-fallout-2-furious-episode-03/2300-15567/';

    const extractor = getExtractor(uri);
    assert.equal(extractor.domain, URL.parse(uri).hostname);

    const {
      title,
      author,
      date_published,
      dek,
      lead_image_url,
      content,
    } = await Mercury.parse(uri, { html, fallback: false });

    assert.equal(title, '2 Fallout 2 Furious - Episode 03');
    assert.equal(author, null);
    assert.equal(date_published, null);
    assert.equal(dek, null);
    assert.equal(
      lead_image_url,
      'https://giantbomb1.cbsistatic.com/uploads/screen_kubrick/6/68646/3191058-spayandneuter.png'
    );

    const $ = cheerio.load(content || '');
    const first13 = excerptContent(
      $('*')
        .first()
        .text(),
      13
    );
    assert.equal(
      first13,
      'Killer wolves, scorpions, and cows - oh my! Ben embarks on a quest'
    );
    assert.equal($('video').length, 1);
  });

  it('news article', async () => {
    const html = fs.readFileSync(
      './fixtures/www.giantbomb.com/1590083896941.html'
    );
    const uri =
      'https://www.giantbomb.com/articles/the-community-spotlight-20200516/1100-6003/';

    const extractor = getExtractor(uri);
    assert.equal(extractor.domain, URL.parse(uri).hostname);

    const {
      title,
      author,
      date_published,
      dek,
      lead_image_url,
      content,
    } = await Mercury.parse(uri, { html, fallback: false });

    assert.equal(title, 'The Community Spotlight 2020.05.16');
    assert.equal(author, 'Marino - Brad Lynch');
    assert.equal(date_published, '2020-05-16T04:00:00.000Z');
    assert.equal(
      dek,
      'This edition of The Community Spotlight is doing sick 540 benihana gap transfers over here in Venice Beach.'
    );
    assert.equal(
      lead_image_url,
      'https://giantbomb1.cbsistatic.com/uploads/screen_kubrick/0/1992/3192150-ex1glvjwoaynrgs.jpeg'
    );

    const $ = cheerio.load(content || '');
    const first13 = excerptContent(
      $('*')
        .first()
        .text(),
      13
    );
    assert.equal(
      first13,
      'It feels good to have Tony Hawk back...Hello and welcome to the latest'
    );
  });

  it('review', async () => {
    const html = fs.readFileSync(
      './fixtures/www.giantbomb.com/1590084729889.html'
    );
    const uri =
      'https://www.giantbomb.com/reviews/doom-eternal-review/1900-797/';

    const extractor = getExtractor(uri);
    assert.equal(extractor.domain, URL.parse(uri).hostname);

    const {
      title,
      author,
      date_published,
      dek,
      lead_image_url,
      content,
    } = await Mercury.parse(uri, { html, fallback: false });

    assert.equal(title, 'Doom Eternal Review');
    assert.equal(author, 'Brad Shoemaker');
    assert.equal(date_published, '2020-04-10T04:00:00.000Z');
    assert.equal(
      dek,
      'It may not reach the sublime heights of its predecessor, but Doom Eternal is bursting at the seams with hellacious action.'
    );
    assert.equal(
      lead_image_url,
      'https://giantbomb1.cbsistatic.com/uploads/screen_kubrick/0/1992/3170538-apps.55453.64809307044061818.61b1d7a1-2194-4bcc-b9a1-d6f87fcc5aed.jpeg'
    );

    const $ = cheerio.load(content || '');
    const first13 = excerptContent(
      $('*')
        .first()
        .text(),
      13
    );
    assert.equal(
      first13,
      "Get ready to shoot this guy's arms off, a lot.There are a few"
    );
  });
});
