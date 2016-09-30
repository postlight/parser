import { NYMagExtractor } from './custom/nymag.com';
import { BloggerExtractor } from './custom/blogspot.com';
import { WikipediaExtractor } from './custom/wikipedia.org';
import { TwitterExtractor } from './custom/twitter.com';
import { NYTimesExtractor } from './custom/www.nytimes.com';
import { TheAtlanticExtractor } from './custom/www.theatlantic.com';
import { NewYorkerExtractor } from './custom/www.newyorker.com';

const Extractors = {
  'nymag.com': NYMagExtractor,
  'blogspot.com': BloggerExtractor,
  'wikipedia.org': WikipediaExtractor,
  'twitter.com': TwitterExtractor,
  'www.nytimes.com': NYTimesExtractor,
  'www.theatlantic.com': TheAtlanticExtractor,
  'www.newyorker.com': NewYorkerExtractor,
};

export default Extractors;
