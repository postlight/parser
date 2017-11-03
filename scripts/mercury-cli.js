const Mercury = require('../dist/mercury');
const fs = require('fs');

const uri = process.argv[2];

const [url, html] = fs.existsSync(uri)
  ? ['http://example.com', fs.readFileSync(uri)]
  : [uri, null];
Mercury.parse(url, html).then(r => console.log(JSON.stringify(r, null, 2)));
