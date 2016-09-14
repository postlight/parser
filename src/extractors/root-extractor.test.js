import assert from 'assert';
import fs from 'fs';
import cheerio from 'cheerio';

import { assertClean } from 'test-helpers';
import {
  default as RootExtractor,
  select,
  cleanBySelectors,
  transformElements,
} from './root-extractor';

import NYMagExtractor from './custom/nymag.com';

describe('RootExtractor', () => {
  it('extracts based on custom selectors', () => {
    const fullUrl = 'http://nymag.com/daily/intelligencer/2016/09/trump-discussed-usd25k-donation-with-florida-ag-not-fraud.html';
    const html = fs.readFileSync('./src/extractors/custom/nymag.com/fixtures/test.html', 'utf8');
    const $ = cheerio.load(html);

    const {
      url,
      title,
    } = RootExtractor.extract(
      NYMagExtractor, { url: fullUrl, html, $, metaCache: [] }
    );

    assert.equal(title, 'Trump Claims He Discussed $25K Donation With Florida Attorney General, But Not Trump University Investigation');
    assert.equal(url, fullUrl);
  });
});

describe('cleanBySelectors($content, $, { clean })', () => {
  it('removes provided selectors from the content', () => {
    const opts = { clean: ['.ad', '.share'] };
    const html = `
      <div>
        <div class="body">
          <div class="share">Share this on twitter plz</div>
          <p>This is some good content</p>
          <div class="ad">Advertisement!</div>
        </div>
    </div>`;
    const $ = cheerio.load(html);

    let $content = $('.body');
    $content = cleanBySelectors($content, $, opts);

    assert.equal($content.find('.ad').length, 0);
    assert.equal($content.find('.share').length, 0);
  });
});

describe('transformElements($content, $, { transforms })', () => {
  it('performs a simple transformation on matched elements', () => {
    const html = `
    <div>
      <div class="body">
        <h1>WOW BIG TITLE</h1>
        <p>Here are some words</p>
        <h1>WOW BIG TITLE</h1>
      </div>
    </div>
    `;
    const opts = {
      transforms: { h1: 'h2' },
    };
    const $ = cheerio.load(html);
    let $content = $('.body');

    const after = `
      <div class="body">
        <h2>WOW BIG TITLE</h2>
        <p>Here are some words</p>
        <h2>WOW BIG TITLE</h2>
      </div>
    `;

    $content = transformElements($content, $, opts);
    assertClean($.html($content), after);
  });

  it('performs a complex transformation on matched elements', () => {
    const html = `
    <div>
      <div class="body">
        <noscript>
          <img src="/img.jpg" />
        </noscript>
        <noscript>
          Something else
        </noscript>
        <p>Here are some words</p>
      </div>
    </div>
    `;
    const opts = {
      transforms: {
        noscript: ($node) => {
          const $children = $node.children();
          if ($children.length === 1 && $children.get(0).tagName === 'img') {
            return 'figure';
          }

          return null;
        },
      },
    };
    const $ = cheerio.load(html);
    let $content = $('.body');

    const after = `
      <div class="body">
        <figure>
          <img src="/img.jpg">
        </figure>
        <noscript>
          Something else
        </noscript>
        <p>Here are some words</p>
      </div>
    `;

    $content = transformElements($content, $, opts);
    assertClean($.html($content), after);
  });
});

describe('select(opts)', () => {
  it('returns a node\'s text with a simple selector', () => {
    const html = `
      <div><div class="author">Bob</div></div>
    `;
    const $ = cheerio.load(html);
    const opts = {
      type: 'author',
      $,
      extractionOpts: {
        selectors: ['.author'],
      },
    };

    const result = select(opts);
    assert.equal(result, 'Bob');
  });

  it('returns a node\'s attr with a attr selector', () => {
    const html = `
      <div>
        <time datetime="2016-09-07T05:07:59-04:00">
          September 7, 2016
        </time>
      </div>
    `;
    const $ = cheerio.load(html);
    const opts = {
      type: 'datePublished',
      $,
      extractionOpts: {
        selectors: ['time[datetime]'],
      },
    };

    const result = select(opts);
    assert.equal(result, '2016-09-07T09:07:59.000Z');
  });
});
