/* eslint-disable */
const execFile = require('child_process').execFile;
const fs = require('fs');
const path = require('path');
const Mercury = require('../dist/mercury');

// get all fixtures
execFile('find', ['fixtures', '-type', 'f'], (err, stdout) => {
  const fixtures = stdout.split('\n');

  const now = new Date();
  const twoWeeks = 2 * 7 * 24 * 60 * 60 * 1000;

  // iterate through fixtures for fixtures older than 2 weeks
  const fixturesToUpdate = fixtures.filter(fixture => {
    const timestamp = path.basename(fixture).split(/\.html$/)[0].trim();
    try {
      const date = new Date(parseInt(timestamp, 10));
      return now - date > twoWeeks;
    } catch (e) {
      // if fixture isn't a timestamp, ignore it
      return false;
    }
  })

  // iterate through fixtures and extract their URLs.
  Promise.all(fixturesToUpdate.slice(0, 2).map(fixture => {
    const html = fs.readFileSync(fixture);
    return Mercury.parse('https://example.com', html)
  })).then(parsedFixtures => {
    const fixturesAndUrls = fixturesToUpdate.slice(0, 2).map((fixture, i) => ({
      fixture, 
      url: parsedFixtures[i].url
    }))
    updateFixture(fixturesAndUrls[0]);
  })
});

const updateFixture = (({ fixture, url }) => {
  execFile('yarn', ['generate-parser', url], (err, stdout) => {
    console.log(`stdout`, stdout);
    const dirRe = new RegExp(`(${path.dirname(fixture)}\/\\d+\.html)`);
    const newFixture = stdout.match(dirRe)[0]

    console.log(`newFixture`, newFixture);
    // replace old fixture with new fixture in tests
    execFile('./scripts/find-and-replace.sh', [fixture, newFixture, 'src/extractors/custom/**/*.test.js'], (err, stdout) => {
      console.log(`err`, err);
      console.log(`stdout`, stdout);
    })
  })
});
