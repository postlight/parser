import assert from 'assert';

import { record } from 'test-helpers';
import Mercury from './mercury';

const fs = require('fs');

describe('Mercury', () => {
  const recorder = record('mercury-test');
  beforeAll(recorder.before);
  afterAll(recorder.after);

  describe('parse(url)', () => {
    it('returns an error if a malformed url is passed', async () => {
      const error = await Mercury.parse('foo.com');

      assert(/does not look like a valid URL/i.test(error.message));
    });

    it('does the whole thing', async () => {
      const result = await Mercury.parse(
        'http://deadspin.com/remember-when-donald-trump-got-booed-for-butchering-ta-1788216229'
      );

      assert.equal(typeof result, 'object');
      assert.equal(result.content.indexOf('score="') === -1, true);
    });

    it('returns an error on non-200 responses', async () => {
      const error = await Mercury.parse(
        'https://www.thekitchn.com/instant-pot-chicken-pesto-pasta-eating-instantly-267141'
      );

      assert(/instructed to reject non-200/i.test(error.message));
    });

    it('returns an error on invalid content types', async () => {
      const error = await Mercury.parse(
        'https://upload.wikimedia.org/wikipedia/commons/5/52/Spacer.gif'
      );

      assert(/content-type for this resource/i.test(error.message));
    });

    it('does wikipedia', async () => {
      const result = await Mercury.parse(
        'https://en.wikipedia.org/wiki/Brihadeeswarar_Temple_fire'
      );

      assert.equal(typeof result, 'object');
    });

    it('does washingtonpost', async () => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
      const result = await Mercury.parse(
        'https://www.washingtonpost.com/news/opinions/wp/2018/10/29/enough-platitudes-lets-name-names/'
      );

      assert.equal(typeof result, 'object');
      assert.equal(result.total_pages, 1);
      assert.equal(
        result.url,
        'https://www.washingtonpost.com/news/opinions/wp/2018/10/29/enough-platitudes-lets-name-names/'
      );
    });

    it('does the nyt', async () => {
      const result = await Mercury.parse(
        'http://www.nytimes.com/2016/08/16/upshot/the-state-of-the-clinton-trump-race-is-it-over.html?_r=0'
      );

      assert.equal(typeof result, 'object');
      assert.equal(result.total_pages, 1);
    });

    it('does ars pagination', async () => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
      const url =
        'https://arstechnica.com/gadgets/2016/08/the-connected-renter-how-to-make-your-apartment-smarter/';
      const result = await Mercury.parse(url, { fetchAllPages: true });

      const { total_pages, pages_rendered } = result;

      assert.equal(total_pages, 3);
      assert.equal(pages_rendered, 3);

      assert.equal(result.next_page_url, `${url}2`);
    });
  });

  it('returns text content if text is passed as contentType', async () => {
    const url =
      'http://nymag.com/daily/intelligencer/2016/09/trump-discussed-usd25k-donation-with-florida-ag-not-fraud.html';
    const html = fs.readFileSync(
      './src/extractors/custom/nymag.com/fixtures/test.html',
      'utf8'
    );
    const { content } = await Mercury.parse(url, { html, contentType: 'text' });

    const htmlRe = /<[a-z][\s\S]*>/g;

    assert.equal(htmlRe.test(content), false);
  });

  it('returns markdown if markdown is passed as contentType', async () => {
    const url =
      'http://nymag.com/daily/intelligencer/2016/09/trump-discussed-usd25k-donation-with-florida-ag-not-fraud.html';
    const html = fs.readFileSync(
      './src/extractors/custom/nymag.com/fixtures/test.html',
      'utf8'
    );
    const { content } = await Mercury.parse(url, {
      html,
      contentType: 'markdown',
    });

    const htmlRe = /<[a-z][\s\S]*>/;
    const markdownRe = /\[[\w\s]+\]\(.*\)/;

    assert.equal(htmlRe.test(content), false);
    assert.equal(markdownRe.test(content), true);
  });

  it('returns custom elements if an extend object is passed', async () => {
    const url =
      'http://nymag.com/daily/intelligencer/2016/09/trump-discussed-usd25k-donation-with-florida-ag-not-fraud.html';
    const html = fs.readFileSync(
      './src/extractors/custom/nymag.com/fixtures/test.html',
      'utf8'
    );
    const { sites } = await Mercury.parse(url, {
      html,
      extend: {
        sites: {
          selectors: ['a.site-name'],
          allowMultiple: true,
        },
      },
    });
    assert.ok(sites);
    assert.equal(sites.length, 8);
    assert.equal(sites[0], 'NYMag.com');
  });

  it('returns an array if a single element matches a custom extend', async () => {
    const url =
      'http://nymag.com/daily/intelligencer/2016/09/trump-discussed-usd25k-donation-with-florida-ag-not-fraud.html';
    const html = fs.readFileSync(
      './src/extractors/custom/nymag.com/fixtures/test.html',
      'utf8'
    );
    const { sites } = await Mercury.parse(url, {
      html,
      extend: {
        sites: {
          selectors: [['li:first-child a.site-name', 'href']],
          allowMultiple: true,
        },
      },
    });
    assert.ok(sites);
    assert.equal(sites.length, 1);
  });

  it('returns custom attributes if an extend object is passed', async () => {
    const url =
      'http://nymag.com/daily/intelligencer/2016/09/trump-discussed-usd25k-donation-with-florida-ag-not-fraud.html';
    const html = fs.readFileSync(
      './src/extractors/custom/nymag.com/fixtures/test.html',
      'utf8'
    );
    const { sites } = await Mercury.parse(url, {
      html,
      extend: {
        sites: {
          selectors: [['a.site-name', 'href']],
          allowMultiple: true,
        },
      },
    });
    assert.ok(sites);
    assert.equal(sites.length, 8);
    assert.equal(sites[1], 'http://nymag.com/daily/intelligencer/');
  });

  it('is able to use custom extractors (with extension) added via api', async () => {
    const url =
      'https://www.sandiegouniontribune.com/business/growth-development/story/2019-08-27/sdsu-mission-valley-stadium-management-firm';
    const html = fs.readFileSync(
      './fixtures/sandiegouniontribune.com/test.html',
      'utf8'
    );

    const customExtractor = {
      domain: 'www.sandiegouniontribune.com',
      title: {
        selectors: ['h1', '.ArticlePage-headline'],
      },
      author: {
        selectors: ['.ArticlePage-authorInfo-bio-name'],
      },
      content: {
        selectors: ['article'],
      },
      extend: {
        testContent: {
          selectors: ['.ArticlePage-breadcrumbs a'],
        },
      },
    };

    Mercury.addExtractor(customExtractor);

    const result = await Mercury.parse(url, { html });
    assert.equal(typeof result, 'object');
    assert.equal(result.author, 'Jennifer Van Grove');
    assert.equal(result.domain, 'www.sandiegouniontribune.com');
    assert.equal(result.total_pages, 1);
    assert.equal(result.testContent, 'Growth & Development');
  });
});
