import assert from 'assert';
import cheerio from 'cheerio';
import fs from 'fs';

import extractBestNode from 'extractors/generic/content/extract-best-node';
import extractCleanNode from './content';

describe('extractCleanNode(article, { $, cleanConditionally, title } })', () => {
  it('cleans cruft out of a DOM node', () => {
    const html = fs.readFileSync('./fixtures/wired.html', 'utf-8');
    const $ = cheerio.load(html);

    const opts = {
      stripUnlikelyCandidates: true,
      weightNodes: true,
      cleanConditionally: true,
    };

    const bestNode = extractBestNode($, opts);
    // let result = $.html(bestNode);
    // // console.log(result)
    // // console.log(result.length)
    const cleanNode = extractCleanNode(bestNode, { $, opts });
    // result = $.html(cleanNode);
    // // console.log(result.length)
    // // console.log(result)
    // // console.log(bestNode.html())

    assert.equal($(cleanNode).text().length, 2687);
  });
});

