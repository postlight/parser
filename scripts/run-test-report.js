const path = require('path');

const comment = require('@postlight/ci-failed-test-reporter').comment;

comment(path.resolve('/test-output.json'));
