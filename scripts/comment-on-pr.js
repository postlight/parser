/* eslint-disable */
const bot = require('@jesses/circle-github-bot').default.create();
const Mercury = require('../dist/mercury.js');
const fs = require('fs');
const getTestReport = require('./get-test-report');

const run = () => {
  const screenshotPath = process.argv[2];

  const fixture = screenshotPath.split('tmp/artifacts/')[1].slice(0, -4);

  const html = fs.readFileSync(`${fixture}`);

  // first parse is just to get the url
  Mercury.parse('http://example.com', { html, fallback: false }).then(
    ({ url, domain, excerpt, word_count, direction }) => {
      // with the url, second pass will test the correct parser
      Mercury.parse(url, { html, fallback: false }).then(json => {
        // removing excerpt b/c this comes from content, not necessary
        delete json.excerpt;

        // adding items that aren't pulled in custom parser w/out fallback
        Object.assign(json, { url, domain, word_count, direction });

        // a quick preview of the parsed content in an html file
        const previewHtml = `<h1>${json.title}</h1><img src=${
          json.lead_image_url
        } /><p>${json.author}</p>${json.content}`;

        const jsonPath = `${screenshotPath}-parsed.json`;
        const fixtureArtifactPath = `tmp/artifacts/${fixture}`;
        const previewPath = `tmp/artifacts/${fixture}.preview.html`;

        fs.writeFileSync(previewPath, previewHtml);
        fs.writeFileSync(jsonPath, JSON.stringify(json));
        fs.writeFileSync(fixtureArtifactPath, html);

        const testReport =
          getTestReport('./test-output.json') || '✅ All tests passed';

        bot.comment(
          process.env.GH_AUTH_TOKEN,
          `### 🤖 Automated Parsing Preview 🤖
**Commit:** \`${bot.env.commitMessage}\`

![Screenshot of fixture (this embed should work after repo is public)](${bot.artifactUrl(
            screenshotPath
          )})

[Original Article](${url}) | ${bot.artifactLink(
            fixtureArtifactPath,
            'HTML Fixture'
          )} | ${bot.artifactLink(previewPath, 'Parsed Content Preview')}

<details>
<summary><b>Parsed JSON</b></summary>

\`\`\`json
${JSON.stringify(json, null, 2)}
\`\`\`

</details>
<br />


**\`null\` fields**

${Object.keys(json)
            .map(key => (json[key] !== null ? '' : `  * \`${key}\n\``))
            .join('\n\n') || 'None'}


${testReport}
`
        );
      });
    }
  );
};

run();
