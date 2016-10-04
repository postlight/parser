import { NYMagExtractor } from './custom/nymag.com';
import { BloggerExtractor } from './custom/blogspot.com';
import { WikipediaExtractor } from './custom/wikipedia.org';
import { TwitterExtractor } from './custom/twitter.com';
import { NYTimesExtractor } from './custom/www.nytimes.com';
import { TheAtlanticExtractor } from './custom/www.theatlantic.com';
import { NewYorkerExtractor } from './custom/www.newyorker.com';
import { WiredExtractor } from './custom/www.wired.com';
import { MSNExtractor } from './custom/www.msn.com';
import { YahooExtractor } from './custom/www.yahoo.com';
import { BuzzfeedExtractor } from './custom/www.buzzfeed.com';
import { WikiaExtractor } from './custom/fandom.wikia.com';
import { LittleThingsExtractor } from './custom/www.littlethings.com';


const Extractors = {
  'nymag.com': NYMagExtractor,
  'blogspot.com': BloggerExtractor,
  'wikipedia.org': WikipediaExtractor,
  'twitter.com': TwitterExtractor,
  'www.nytimes.com': NYTimesExtractor,
  'www.theatlantic.com': TheAtlanticExtractor,
  'www.newyorker.com': NewYorkerExtractor,
  'www.wired.com': WiredExtractor,
  'www.msn.com': MSNExtractor,
  'www.yahoo.com': YahooExtractor,
  'www.buzzfeed.com': BuzzfeedExtractor,
  'fandom.wikia.com': WikiaExtractor,
  'www.littlethings.com': LittleThingsExtractor,

};

export default Extractors;
