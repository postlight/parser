import URL from 'url';
import fs from 'fs';
import assert from 'assert';

import TextExtractor from './text-file';

describe('textExtractor(obj)', () => {
  it('fetches text file', async () => {
    const $ = `
CONTENTS OF A TEXT FILE
-----------------------

1. Test a text file.
2. Test another text file.
`;
    const url = 'http://www.bvestation.com/worktest/readme.txt';
    const parsedUrl = URL.parse(url);
    const headers = {
      'last-modified': 'Thu, 09 Mar 2017 21:52:56 GMT',
      'content-type': 'text/plain'
    };

    const extracted = TextExtractor.extract({ $, parsedUrl, headers });

    assert.equal(typeof extracted, 'object');
    assert.equal(extracted.title, 'readme.txt');
    assert.equal(extracted.content, '<br />CONTENTS OF A TEXT FILE<br />-----------------------<p />1. Test a text file.<br />2. Test another text file.<br />');
    assert.equal(extracted.date_published, '2017-03-10T02:52:56.000Z');
  });
});
