/* eslint-disable */
const bot = require('circle-github-bot').create();
const Mercury = require('../dist/mercury.js');
const fs = require("fs");

const run = async () => {
  const screenshot = process.argv[2];

  const fixture = screenshot.split('tmp/artifacts/')[1].slice(0, -4);

  const html = fs.readFileSync(`${fixture}`);
  const json = await Mercury.parse('http://example.com', html, { fallback: false });

  const jsonPath = `${screenshot}-parsed.json`;
  const fixtureArtifactPath = "tmp/artifacts/" + fixture;

  fs.writeFileSync(jsonPath, JSON.stringify(json));
  fs.writeFileSync(fixtureArtifactPath, html);

  bot.comment(`
  <h3>${bot.env.commitMessage}</h3>
  Page: <strong>${bot.artifactLink(ffixtureArtifactPath, 'Page')}</strong>
  Screenshot: <strong>${bot.artifactLink(screenshot, 'Screenshot')}</strong>
  JSON: <strong>${bot.artifactLink(jsonPath, 'JSON')}</strong>
  `);
}

run();
