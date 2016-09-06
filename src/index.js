import fs from 'fs'

import Resource from './resource'
import GenericExtractor from './extractor/generic'

import fetchResource from './resource/utils/fetch-resource'
// export default fetchResource

// export { default as GenericExtractor } from './extractor/generic/index.js'

const Iris = {
  parse: async function(url) {
    const $ = await Resource.create(url)
    const result = GenericExtractor.parse(url, null, $)
    return result
  }
}

export default Iris
