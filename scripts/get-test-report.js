const fs = require('fs');

const getTestReport = path => {
  try {
    const testReport = JSON.parse(fs.readFileSync(path));
    const { numFailedTests } = testReport;
    if (numFailedTests === 0) {
      return false;
    }
    const { testResults } = testReport;
    const failedTests = testResults
      .map(({ assertionResults }) =>
        assertionResults.filter(({ status }) => status !== 'passed')
      )
      .reduce((acc, arr) => acc.concat(arr));

    const failureReport = `
<details>
<summary>
<b>${numFailedTests} failed tests 😱</b>
</summary>

---

${failedTests
      .map(
        ({ fullName, failureMessages }) =>
          `
**${fullName}**

  <details>
  <summary>
    See what went wrong
  </summary>

\`\`\`bash
  ${failureMessages.join('\n\n')}
\`\`\`

  </details>

---
  `
      )
      .join('\n\n')}

</details>
  `;
    return failureReport;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Error generating test report', e);
    return false;
  }
};

module.exports = getTestReport;
