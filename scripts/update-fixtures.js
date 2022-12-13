/* eslint-disable */

const fsPromises = require('fs/promises');
const path = require('path');
const URL = require('url');
const Parser = require('../dist/mercury');

const FIXTURES_PATH = path.join(__dirname, '..', 'fixtures');

const perform = async () => {
  const fixtures = (await fsPromises.readdir(FIXTURES_PATH)).filter(f =>
    f.match(/\.html$/)
  );

  const TODAY = new Date();
  const TWO_WEEKS_AGO = new Date(TODAY.setDate(TODAY.getDate() - 14));

  console.log('Finding fixtures to update…');
  const fixturesToUpdate = (await Promise.all(
    fixtures.map(async filename => {
      const stats = await fsPromises.stat(path.join(FIXTURES_PATH, filename));
      return [filename, stats.mtime];
    })
  ))
    .filter(([_filename, timestamp]) => timestamp <= TWO_WEEKS_AGO)
    .map(([filename, _timestamp]) => filename);
  console.log(`${fixturesToUpdate.length} fixtures are out of date`);

  const changeBase = [];
  const otherMess = [];

  console.log('Updating all fixtures');
  for (const filename of fixturesToUpdate) {
    const fixturePath = path.join(FIXTURES_PATH, filename);
    const baseDomain = filename.replace(/(?:--[a-z-]+)?\.html$/, '');
    const oldHtml = await fsPromises.readFile(fixturePath);
    const { url } = await Parser.parse(`http://${baseDomain}`, {
      html: oldHtml,
    });

    console.log(`Updating fixture for ${baseDomain} (${url})`);
    try {
      const { url: updatedUrl } = await Parser.parse(url);

      if (!updatedUrl) {
        otherMess.push({ updatedUrl, url, filename, baseDomain });
        continue;
      }

      const { hostname } = URL.parse(updatedUrl);

      if (hostname !== baseDomain) {
        console.log(
          `Base URL has changed from ${baseDomain} to ${hostname}, passing`
        );

        changeBase.push({
          filename,
          url,
          baseDomain,
          newBaseDomain: hostname,
          updatedUrl,
        });

        continue;
      }

      const $ = await Parser.fetchResource(updatedUrl);
      const newHtml = $.html();

      await fsPromises.writeFile(fixturePath, newHtml);
    } catch (e) {
      console.log('Fixture update failed to parse', e);
    }
  }

  console.log('changed bases', changeBase);
  console.log('other mess', otherMess);
};

perform();
