import fs from 'fs'

import Resource from './resource'
import getExtractor from './extractor/get-extractor'
import RootExtractor from './extractor/custom/extractor'

import fetchResource from './resource/utils/fetch-resource'

const Iris = {
  parse: async function(url, html) {
    const $ = await Resource.create(url, html)
    const Extractor = getExtractor(url)
    const result = RootExtractor.extract(Extractor, url, html, $)
    return result
  }
}

export default Iris
