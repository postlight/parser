import NYMagExtractor from './custom/nymag.com';
import BloggerExtractor from './custom/blogspot.com';
import WikipediaExtractor from './custom/wikipedia.org';
import TwitterExtractor from './custom/twitter.com';

const Extractors = {
  'nymag.com': NYMagExtractor,
  'blogspot.com': BloggerExtractor,
  'wikipedia.org': WikipediaExtractor,
  'twitter.com': TwitterExtractor,
};

export default Extractors;
