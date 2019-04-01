const path = require('path');
const fs = require('fs');

const { getReport } = require('@postlight/ci-failed-test-reporter');

const report = getReport(path.join(__dirname, '../', '/test-output.json'));
if (report) {
  const commentPath = 'tmp/artifacts/comment.json';
  fs.mkdirSync('tmp');
  fs.mkdirSync('tmp/artifacts');
  fs.writeFileSync(
    commentPath,
    JSON.stringify({
      body: report,
      issue: process.env.CIRCLE_PULL_REQUEST,
    })
  );
}
