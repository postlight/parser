import assert from 'assert';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

const fs = require('fs');

describe('WwwZdfDeExtractor', () => {
  it('initial test', async () => {
    const html = fs.readFileSync('./fixtures/www.zdf.de/1590099704886.html');
    const uri =
      'https://www.zdf.de/nachrichten/hallo-deutschland/fernsehgarten-2020-ohne-zuschauer-100.html';

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

    assert.equal(title, 'Fernsehgarten 2020 ohne Zuschauer');
    assert.equal(author, null);
    assert.equal(date_published, '2020-05-08T20:50:33.431Z');
    assert.equal(dek, null);
    assert.equal(
      lead_image_url,
      'https://www.zdf.de/assets/fernsehgarten-2020-ohne-zuschauer-102~1280x720?cb=1588953824779'
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
      'von Susanne Geldhard Am 10. Mai startet wieder der ZDF-Fernsehgarten doch dieses Mal'
    );
    assert.equal($('img').length, 1);
    assert.equal(
      $(
        'img[src="https://www.zdf.de/assets/fernsehgarten-2020-ohne-zuschauer-102~1920x1080?cb=1588953824779"]'
      ).length,
      1
    );
  });

  it('https://www.zdf.de/nachrichten/wirtschaft/coronavirus-fluggesellschaften-staatsbeteiligung-wettbewerb-100.html', async () => {
    const html = fs.readFileSync('./fixtures/www.zdf.de/1590161420163.html');
    const uri =
      'https://www.zdf.de/nachrichten/wirtschaft/coronavirus-fluggesellschaften-staatsbeteiligung-wettbewerb-100.html';

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

    assert.equal(
      title,
      'Milliarden für Lufthansa: Wenn der Staat Airlines stützt'
    );
    assert.equal(author, 'Brigitte Scholtes');
    assert.equal(date_published, '2020-05-22T15:09:17.041Z');
    assert.equal(dek, null);
    assert.equal(
      lead_image_url,
      'https://www.zdf.de/assets/lufthansa-154~1280x720?cb=1590151196126'
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
      'Milliardenhilfen sollen der Lufthansa durch die Corona-Krise helfen. Ein Grund für die Staatsbeteiligung:'
    );
    assert.equal($('h2').length, 5);
    assert.equal($('img').length, 2);
    assert.equal($('img[src*="assets"]').length, 2);
  });

  it('https://www.zdf.de/comedy/die-anstalt/die-anstalt-vom-10-dezember-2019-100.html', async () => {
    const html = fs.readFileSync('./fixtures/www.zdf.de/1590166652115.html');
    const uri =
      'https://www.zdf.de/comedy/die-anstalt/die-anstalt-vom-10-dezember-2019-100.html';

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

    assert.equal(title, 'Die Anstalt vom 10. Dezember 2019');
    assert.equal(author, null);
    assert.equal(date_published, '2020-01-23T09:28:19.824Z');
    assert.equal(dek, null);
    assert.equal(
      lead_image_url,
      'https://www.zdf.de/assets/191210-teaserbild-100~768x432?cb=1575991596551'
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
      'Wortgewandt, unkonventionell und mit viel satirischer Schärfe: Max Uthoff und Claus von Wagner'
    );
    assert.equal($('img').length, 1);
  });

  it('https://www.zdf.de/comedy/die-anstalt/die-gaeste-am-2-juni-2020-100.html', async () => {
    const html = fs.readFileSync('./fixtures/www.zdf.de/1590167629561.html');
    const uri =
      'https://www.zdf.de/comedy/die-anstalt/die-gaeste-am-2-juni-2020-100.html';

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

    assert.equal(title, 'Die Gäste am 2. Juni 2020');
    assert.equal(author, null);
    assert.equal(date_published, '2020-05-05T15:08:35.657Z');
    assert.equal(dek, null);
    assert.equal(
      lead_image_url,
      'https://www.zdf.de/assets/max-von-wagner-und-max-uthoff-100~1280x720?cb=1563284652517'
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
      'Comedy | Die Anstalt - Die Gäste am 2. Juni 2020 (1/4) Wortgewandt,'
    );
    assert.equal($('img').length, 4);
    assert.equal($('hr').length, 3);
  });

  it('https://www.zdf.de/nachrichten/briefing/coronavirus-homeoffice-ueberwachung-zdfheute-update-100.html', async () => {
    const html = fs.readFileSync('./fixtures/www.zdf.de/1590170681758.html');
    const uri =
      'https://www.zdf.de/nachrichten/briefing/coronavirus-homeoffice-ueberwachung-zdfheute-update-100.html';

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

    assert.equal(
      title,
      'Update am Abend: Wenn der Chef im Homeoffice zuschaut'
    );
    assert.equal(author, 'Katja Belousova');
    assert.equal(date_published, '2020-05-22T15:12:20.390Z');
    assert.equal(dek, null);
    assert.equal(
      lead_image_url,
      'https://www.zdf.de/assets/update-typical-100~1280x720?cb=1589468949457'
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
      'Guten Abend, wieder eine Arbeitswoche rum. Für viele fand diese noch immer in'
    );
    assert.equal($('img').length, 5);
  });

  it('https://www.zdf.de/dokumentation/37-grad/37-bauernhof-statt-altersheim-100.html', async () => {
    const html = fs.readFileSync('./fixtures/www.zdf.de/1590171317943.html');
    const uri =
      'https://www.zdf.de/dokumentation/37-grad/37-bauernhof-statt-altersheim-100.html';

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

    assert.equal(title, 'Bauernhof statt Altersheim');
    assert.equal(author, null);
    assert.equal(date_published, '2020-05-05T12:23:19.621Z');
    assert.equal(dek, null);
    assert.equal(
      lead_image_url,
      'https://epg-image.zdf.de/fotobase-webdelivery/images/0008e618-3276-4865-b375-07c1955e5b5d?layout=1280x720'
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
      '"Green Care" ist ein Trend in vielen Ländern. Senioren leben auf dem Bauernhof'
    );
    assert.equal($('img').length, 1);
    assert.equal($('p').length, 9);
  });
});
