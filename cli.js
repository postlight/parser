#!/usr/bin/env node
/* eslint-disable no-multi-str */

const Mercury = require('./dist/mercury');

const [, , url] = process.argv;

(async urlToParse => {
  if (!urlToParse) {
    console.log(
      '\n\
mercury-parser\n\n\
    The Mercury Parser extracts semantic content from any url\n\n\
Usage:\n\
\n\
    mercury-parser [url-to-parse]\n\
\n\
'
    );
    return;
  }
  const result = await Mercury.parse(urlToParse);
  console.log(JSON.stringify(result, null, 2));
})(url);
