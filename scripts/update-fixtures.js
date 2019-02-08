/* eslint-disable */

const { execFile, execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const URL = require('url');
const octokit = require('@octokit/rest')();

const Mercury = require('../dist/mercury');

// get all fixtures
execFile('find', ['fixtures', '-type', 'f'], (err, stdout) => {
  const fixtures = stdout.split('\n');

  const now = new Date();
  const twoWeeks = 2 * 7 * 24 * 60 * 60 * 1000;

  // iterate through fixtures for fixtures older than 2 weeks
  console.log('Finding fixtures to update...');
  const fixturesToUpdate = fixtures
    .filter(fixture => {
      const timestamp = path
        .basename(fixture)
        .split(/\.html$/)[0]
        .trim();
      try {
        const date = new Date(parseInt(timestamp, 10));
        return now - date > twoWeeks;
      } catch (e) {
        // if fixture isn't a timestamp, ignore it
        return false;
      }
    })
    .slice(0, 1);
  console.log(`${fixturesToUpdate.length} fixtures are out of date`);

  // iterate through fixtures and extract their URLs.
  console.log('Extracting urls...');
  const baseDomains = fixturesToUpdate.map(fixture => fixture.split('/')[1]);
  Promise.all(
    fixturesToUpdate.map((fixture, i) => {
      const html = fs.readFileSync(fixture);
      return Mercury.parse(`http://${baseDomains[i]}`, { html });
    })
  ).then(parsedFixture => {
    const fixturesAndUrls = fixturesToUpdate.reduce(
      (acc, fixture, i) =>
        acc.concat({
          fixture,
          url: parsedFixture[i].url,
          baseDomain: baseDomains[i],
        }),
      []
    );

    console.log('Updating all fixtures');
    const fns = fixturesAndUrls
      .map(fixtureAndUrl => {
        return () => {
          // console.log('Updating fixture for', fixtureAndUrl);
          return updateFixture(fixtureAndUrl);
        };
      })
      .concat(() => {
        return new Promise(res => {
          console.log('changed bases', changeBase);
          console.log(`otherMess`, otherMess);
          res();
        });
      });
    promiseSerial(fns);
  });
});

const changeBase = [];
const otherMess = [];
const updateFixture = ({ fixture, url, baseDomain }) => {
  return new Promise(res => {
    Mercury.parse(url)
      .then(({ url: updatedUrl }) => {
        if (!updatedUrl) {
          otherMess.push({ updatedUrl, url, fixture, baseDomain });
          return res();
        }
        console.log(`updatedUrl`, updatedUrl);
        const { hostname } = URL.parse(updatedUrl);
        if (hostname !== baseDomain) {
          console.log('Base URL has changed!!! Do something different');
          console.log(`url`, url);
          console.log(`updatedUrl`, updatedUrl);
          console.log(`hostname`, hostname);
          changeBase.push({
            fixture,
            url,
            baseDomain,
            newBaseDomain: hostname,
            updatedUrl,
          });
          return res();
        }
        execFile('yarn', ['generate-parser', url], (err, stdout) => {
          // console.log(`stdout`, stdout);
          const dirRe = new RegExp(`(${path.dirname(fixture)}\/\\d+\.html)`);
          const newFixture = stdout.match(dirRe)[0];

          console.log(`newFixture`, newFixture);
          // replace old fixture with new fixture in tests
          execFile(
            './scripts/find-and-replace.sh',
            [fixture, newFixture, 'src/extractors/custom/**/*.test.js'],
            (err, stdout) => {
              // remove old fixture
              fs.unlinkSync(fixture);
              const { branchName, commitMessage } = doTestsPass(baseDomain)
                ? {
                    branchName: `chore-update-${baseDomain}-fixture`,
                    commitMessage: `chore: update ${baseDomain} fixture`,
                  }
                : {
                    branchName: `fix-update-${baseDomain}-extractor`,
                    commitMessage: `fix: update ${baseDomain} extractor`,
                  };

              createAndPushBranch({ branchName, commitMessage });
              createPR({ branchName, title: commitMessage });
            }
          );
        });
      })
      .catch(e => {
        otherMess.push({ fixture, url, baseDomain, e });
      });
  });
};

const doTestsPass = site => {
  try {
    execFileSync('yarn', ['test:node', site]);
    return true;
  } catch (e) {
    return false;
  }
};

const promiseSerial = funcs =>
  funcs.reduce(
    (promise, func) =>
      promise.then(result => func().then(Array.prototype.concat.bind(result))),
    Promise.resolve([])
  );

const createAndPushBranch = ({ branchName, commitMessage }) => {
  execFileSync('git', [
    'config',
    'user.email',
    'adam.pash+postlight-bot@postlight.com',
  ]);
  execFileSync('git', ['config', 'user.name', 'Postlight Bot']);
  execFileSync('git', ['checkout', '-b', branchName]);
  execFileSync('git', ['add', '.']);
  execFileSync('git', ['commit', '-m', commitMessage]);
  execFileSync('git', [
    'push',
    '-q',
    `https://${
      process.env.GH_AUTH_TOKEN
    }@github.com/postlight/mercury-parser.git`,
  ]);
};

const createPR = ({ branchName, title, body = '' }) => {
  octokit.authenticate({
    type: 'token',
    token: process.env.GH_AUTH_TOKEN,
  });

  octokit.pulls.create({
    owner: 'postlight',
    repo: 'mercury-parser',
    title,
    head: branchName,
    base: 'master',
    body,
    maintainer_can_modify: true,
  });
};
