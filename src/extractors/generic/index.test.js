import assert from 'assert';
import moment from 'moment';

import GenericExtractor from './index';

const fs = require('fs');

describe('GenericExtractor', () => {
  describe('extract(opts)', () => {
    it('extracts this old LA Times article', () => {
      const html = fs.readFileSync('./fixtures/latimes.html', 'utf-8');

      const { title, author, date_published, dek } = GenericExtractor.extract({
        url: 'http://latimes.com',
        html,
        metaCache: [],
      });
      const newDatePublished = moment(date_published).format();

      assert.equal(author, null);
      assert.equal(
        title,
        'California appears poised to be first to ban power-guzzling big-screen TVs'
      );
      assert.equal(newDatePublished.split('T')[0], '2009-10-14');
      assert.equal(dek, null);
    });

    it('extracts html and returns the article title', () => {
      const html = fs.readFileSync('./fixtures/wired.html', 'utf-8');

      const { author, title, datePublished, dek } = GenericExtractor.extract({
        url: 'http://wired.com',
        html,
        metaCache: [],
      });

      assert.equal(author, 'Eric Adams');
      assert.equal(
        title,
        'Airplane Tires Don’t Explode on Landing Because They Are Pumped!'
      );
      assert.equal(datePublished, null);
      assert.equal(dek, null);
    });
  });
});
