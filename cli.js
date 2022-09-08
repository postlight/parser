#!/usr/bin/env node
/* eslint-disable */

const Parser = require('./dist/mercury');
const package_info = require('./package.json');
const argv = require('yargs-parser')(process.argv.slice(2));

const {
  _: [url],
  format,
  f,
  extend,
  e,
  extendList,
  l,
  header,
  h,
  addExtractor,
  x,
  version,
} = argv;
(async (
  urlToParse,
  contentType,
  extendedTypes,
  extendedListTypes,
  headers,
  addExtractor,
  version
) => {
  if (version) {
    console.log(package_info.version);
    process.exit(0);
  }

  if (!urlToParse) {
    console.log(
      '\n\
postlight-parser\n\n\
    The Postlight Parser extracts semantic content from any url\n\n\
Usage:\n\
\n\
    $ postlight-parser url-to-parse [--format=html|text|markdown] [--header.name=value]... [--extend type=selector]... [--extend-list type=selector]... [--add-extractor path_to_extractor.js]... \n\
\n\
'
    );
    return;
  }
  try {
    const contentTypeMap = {
      html: 'html',
      markdown: 'markdown',
      md: 'markdown',
      text: 'text',
      txt: 'text',
    };

    const extensions = {};
    [].concat(extendedTypes || []).forEach(t => {
      const [name, selector] = t.split('=');
      const fullSelector =
        selector.indexOf('|') > 0 ? selector.split('|') : selector;
      extensions[name] = { selectors: [fullSelector] };
    });
    [].concat(extendedListTypes || []).forEach(t => {
      const [name, selector] = t.split('=');
      const fullSelector =
        selector.indexOf('|') > 0 ? selector.split('|') : selector;
      extensions[name] = {
        selectors: [fullSelector],
        allowMultiple: true,
      };
    });

    // Attempt to load custom extractor from path.
    let customExtractor;
    if (addExtractor) {
      customExtractor = require(addExtractor);
    }

    const result = await Parser.parse(urlToParse, {
      contentType: contentTypeMap[contentType],
      extend: extensions,
      headers,
      customExtractor,
    });
    console.log(JSON.stringify(result, null, 2));
  } catch (e) {
    if (e.message === 'ETIMEDOUT' && false) {
      console.error(
        '\nPostlight Parser encountered a timeout trying to load that resource.'
      );
    } else {
      console.error(
        '\nPostlight Parser encountered a problem trying to parse that resource.\n'
      );
      console.error(e);
    }
    const reportBug =
      'If you believe this was an error, please file an issue at:\n\n    https://github.com/postlight/parser/issues/new';
    console.error(`\n${reportBug}\n`);
    process.exit(1);
  }
})(
  url,
  format || f,
  extend || e,
  extendList || l,
  header || h,
  addExtractor || x
);
