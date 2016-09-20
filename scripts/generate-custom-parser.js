import fs from 'fs'
import URL from 'url'
import inquirer from 'inquirer'
import ora from 'ora'

import Mercury from '../dist/mercury'
import extractorTemplate from './templates/custom-extractor'
import extractorTestTemplate from './templates/custom-extractor-test'

const questions = [
  {
    type: 'input',
    name: 'website',
    message: 'Paste a url to an article you\'d like to create or extend a parser for:',
    validate(value) {
      const { hostname } = URL.parse(value);
      if (hostname) return true;

      return false;
    },
  },
];

inquirer.prompt(questions).then((answers) => {
  scaffoldCustomParser(answers.website);
});

let spinner;
function confirm(fn, args, msg, newParser) {
  spinner = ora({ text: msg });
  spinner.start();
  const result = fn.apply(null, args);

  if (result && result.then) {
    result.then(r => savePage(r, args, newParser));
  } else {
    spinner.succeed();
  }

  return result;
}

function savePage($, [url], newParser) {
  const { hostname } = URL.parse(url);

  spinner.succeed();

  const filename = new Date().getTime();
  const file = `./fixtures/${hostname}/${filename}.html`;

  fs.writeFileSync(file, $.html());

  if (newParser) {
    confirm(generateScaffold, [url, file], 'Generating parser and tests');
    console.log(`Your custom site extractor has been set up. To get started building it, run
    npm test -- ${getDir(url)}/index.test.js`)
  } else {
    console.log(`It looks like you already have a custom parser for this url.
The page you linked to has been added to ${file}. Copy and paste
the following code to use that page in your tests:
const html = fs.readFileSync('${file}');`)
  }
}

function generateScaffold(url, file) {
  const { hostname } = URL.parse(url);
  const extractor = extractorTemplate(hostname)
  const extractorTest = extractorTestTemplate(file, url, getDir(url))

  fs.writeFileSync(`${getDir(url)}/index.js`, extractor)
  fs.writeFileSync(`${getDir(url)}/index.test.js`, extractorTest)
}

function confirmCreateDir(dir, msg) {
  if (!fs.existsSync(dir)) {
    confirm(fs.mkdirSync, [dir], msg);
  }
}

function scaffoldCustomParser(url) {
  const dir = getDir(url);
  const { hostname } = URL.parse(url);
  let newParser = false

  if (!fs.existsSync(dir)) {
    newParser = true
    confirmCreateDir(dir, `Creating ${hostname} directory`);
    confirmCreateDir(`./fixtures/${hostname}`, 'Creating fixtures directory');
  }

    confirm(Mercury.fetchResource, [url], 'Fetching fixture', newParser);
}

function getDir(url) {
  const { hostname } = URL.parse(url);
  return `./src/extractors/custom/${hostname}`;
}
