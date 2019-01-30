/* eslint-disable */
const express = require('express'); // eslint-disable-line import/no-extraneous-dependencies
const request = require('request');

const app = express();
var server;

const start = () => {
  app.use('/:url', (req, res) => {
    const url = req.originalUrl.slice(1);

    const options = {
      url,
      // Don't set encoding; fixes issues
      // w/gzipped responses
      encoding: null,
      // Accept cookies
      jar: true,
      // Accept and decode gzip
      gzip: true,
      // Follow any redirect
      followAllRedirects: true,
    };
    req.pipe(request(options)).pipe(res);
  });

  server = app.listen(process.env.PORT || 3000);
};

const stop = () => {
  server && server.close();
};

start();
require('child_process').exec(
  'node ./node_modules/karma/bin/karma start ./scripts/karma.conf.js' +
    (process.env.CI ? ' --CI' : ''),
  { stdio: [0, 1, 2] },
  (err, stdout) => {
    if (err) {
      console.log('stdout', stdout);
      process.exit(1);
    } else {
      console.log('stdout', stdout);
    }
    stop();
  }
);
