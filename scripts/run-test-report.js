const path = require('path');
const octokit = require('@octokit/rest')

octokit();

const { comment } = require('@postlight/ci-failed-test-reporter');

comment(path.resolve('/test-output.json'));
