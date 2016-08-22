import fs from 'fs'

import GenericExtractor from './extractor/generic/index.js'

const html = fs.readFileSync('../fixtures/wired.html', 'utf-8')
const result = GenericExtractor.parse(html)
console.log(result)
