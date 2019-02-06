#!/usr/bin/env node
/* eslint-disable */

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
  try {
    const result = await Mercury.parse(urlToParse);
    console.log(JSON.stringify(result, null, 2));
  } catch (e) {
    const reportBug =
      'If you believe this was an error, please file an issue at:\n\n    https://github.com/postlight/mercury-parser/issues/new';
    if (e.message === 'ETIMEDOUT') {
      console.error(
        `\nMercury Parser encountered a timeout trying to load that resource.\n\n${reportBug}\n`
      );
    } else {
      console.error(
        '\nMercury Parser encountered an error trying to parse that resource.\n\n'
      );
      console.error(e);
      console.error(`\n\n${reportBug}\n`);
    }
    process.exit(1);
  }
})(url);
