import fs from 'fs'

import Resource from './resource'
import GenericExtractor from './extractor/generic'

import fetchResource from './resource/utils/fetch-resource'

const Iris = {
  parse: async function(url, html) {
    const $ = await Resource.create(url, html)
    const result = GenericExtractor.parse(url, null, $)
    return result
  }
}

export default Iris
