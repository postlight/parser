const path = require('path');

const { comment } = require('@postlight/ci-failed-test-reporter');

comment(path.join(__dirname, '../', '/test-output.json'));
