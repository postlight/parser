import GenericExtractor from './generic'
import NYMagExtractor from './custom/nymag.com'
import BloggerExtractor from './custom/blogspot.com'
import WikipediaExtractor from './custom/wikipedia.org'

const Extractors = {
  'nymag.com': NYMagExtractor,
  'blogspot.com': BloggerExtractor,
  'wikipedia.org': WikipediaExtractor,
}

export default Extractors
