import GenericContentExtractor from './content-extractor.js'

const GenericExtractor = {
  parse: (html) => {
    return {
      content: GenericContentExtractor.parse(html)
    }
  }
}

export default GenericExtractor

