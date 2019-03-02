import assert from 'assert';
import nock from 'nock'; // eslint-disable-line import/no-extraneous-dependencies
import path from 'path';
import cheerio from 'cheerio';

// const fs = require('fs');

export function clean(string) {
  return string
    .trim()
    .replace(/\r?\n|\r/g, '')
    .replace(/\s+/g, ' ');
}

export function assertClean(a, b) {
  assert.equal(clean(a), clean(b));
}

// using this from https://www.ctl.io/developers/blog/post/http-apis-test-code
export function record(name, options = {}) {
  const test_folder = options.test_folder || '.';
  const fixtures_folder = options.fixtures_folder || 'fixtures/nock';
  const fp = path.join(test_folder, fixtures_folder, `${name}.js`);
  // `has_fixtures` indicates whether the test has fixtures we should read,
  // or doesn't, so we should record and save them.
  // the environment variable `NOCK_RECORD` can be used to force a new recording.
  let has_fixtures = !!process.env.NOCK_RECORD;

  return {
    before: () => {
      if (cheerio.browser) return;
      if (!has_fixtures) {
        try {
          require(`../${fp}`); // eslint-disable-line global-require, import/no-dynamic-require, max-len
          has_fixtures = true;
        } catch (e) {
          nock.recorder.rec({
            dont_print: true,
          });
        }
      } else {
        has_fixtures = false;
        nock.recorder.rec({
          dont_print: true,
        });
      }
    },

    after: done => {
      if (!has_fixtures && !cheerio.browser) {
        has_fixtures = nock.recorder.play();
        // eslint-disable-next-line no-console
        console.log(
          `This is disabled for browser/node interop. To capture fixutres,
          open ${'`src/test-helpers.js`'} and uncomment lines 58 and 59 and
          the fs import at top of file.`
        );
        // const text = `const nock = require('nock');\n${has_fixtures.join('\n')}`;
        // fs.writeFile(fp, text, done);
      } else {
        done();
      }
    },
  };
}

export class MockDomNode {
  constructor() {
    this.attributes = [
      {
        name: 'class',
        value: 'foo bar',
      },
    ];
  }

  setAttribute(key, val) {
    this.attributes.pop();
    this.attributes.push({ name: key, value: val });
  }

  removeAttribute() {
    this.attributes.pop();
  }
}
