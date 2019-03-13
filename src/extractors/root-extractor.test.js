import assert from 'assert';
import cheerio from 'cheerio';

import { assertClean } from 'test-helpers';
import RootExtractor, {
  select,
  cleanBySelectors,
  transformElements,
} from './root-extractor';

import { NYMagExtractor } from './custom/nymag.com';

const fs = require('fs');

describe('RootExtractor', () => {
  it('only returns what the custom parser gives it if fallback is disabled', () => {
    const fullUrl =
      'http://nymag.com/daily/intelligencer/2016/09/trump-discussed-usd25k-donation-with-florida-ag-not-fraud.html';
    const html = fs.readFileSync(
      './src/extractors/custom/nymag.com/fixtures/test.html',
      'utf8'
    );
    const $ = cheerio.load(html);

    const { url } = RootExtractor.extract(NYMagExtractor, {
      url: fullUrl,
      html,
      $,
      metaCache: [],
      fallback: false,
    });

    assert.equal(url, null);
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
        noscript: ($node, $) => {
          const $children = $.browser ? $($node.text()) : $node.children();
          if (
            $children.length === 1 &&
            $children.get(0) !== undefined &&
            $children.get(0).tagName.toLowerCase() === 'img'
          ) {
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
  it("returns a node's text with a simple selector", () => {
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

  it("returns a node's attr with an attr selector", () => {
    const html = `
      <div>
        <time datetime="2016-09-07T05:07:59-04:00">
          September 7, 2016
        </time>
      </div>
    `;
    const $ = cheerio.load(html);
    const opts = {
      type: 'date_published',
      $,
      extractionOpts: {
        selectors: [['time', 'datetime']],
      },
    };

    const result = select(opts);
    assert.equal(result, '2016-09-07T09:07:59.000Z');
  });

  it("returns a node's html when it is a content selector", () => {
    const html = `
      <div><div class="content-is-here"><p>Wow what a piece of content</p></div></div>
    `;
    const $ = cheerio.load(html);
    const opts = {
      type: 'content',
      $,
      extractionOpts: {
        selectors: ['.content-is-here'],
      },
      extractHtml: true,
    };

    const result = select(opts);
    assertClean(result, html);
  });

  it('handles multiple matches when the content selector is an array', () => {
    const html = `
      <div><div><img class="lead-image" src="#" /><div class="content-is-here"><p>Wow what a piece of content</p></div></div></div>
    `;
    const $ = cheerio.load(html);
    const opts = {
      type: 'content',
      $,
      extractionOpts: {
        selectors: [['.lead-image', '.content-is-here']],
      },
      extractHtml: true,
    };

    const result = select(opts);
    assert.equal($(result).find('img.lead-image').length, 1);
    assert.equal($(result).find('.content-is-here').length, 1);
  });

  it('skips multi-match if not all selectors are present', () => {
    const html = `
      <div><div><img class="lead-image" src="#" /><div class="content-is-here"><p>Wow what a piece of content</p></div></div></div>
    `;
    const $ = cheerio.load(html);
    const opts = {
      type: 'content',
      $,
      extractionOpts: {
        selectors: [['.lead-image', '.content-is-here', '.foo']],
      },
      extractHtml: true,
    };

    const result = select(opts);

    assert.equal(result, null);
  });

  it('returns an array of results if allowMultiple is true', () => {
    const html = `
      <div><div><ul><li class="item">One</li><li class="item">Two</li></ul></div></div>
      `;
    const $ = cheerio.load(html);
    const opts = {
      type: 'items',
      $,
      extractionOpts: {
        selectors: ['.item'],
        allowMultiple: true,
      },
      extractHtml: true,
    };

    const result = select(opts);

    assert.equal(result.length, 2);
    assert.deepEqual(result, [
      '<li class="item">One</li>',
      '<li class="item">Two</li>',
    ]);
  });
});
