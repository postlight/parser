import GenericExtractor from './generic'
import NYMagExtractor from './custom/nymag.com'
import BloggerExtractor from './custom/blogspot.com'

const Extractors = {
  'nymag.com': NYMagExtractor,
  'blogspot.com': BloggerExtractor,
}

export default Extractors
