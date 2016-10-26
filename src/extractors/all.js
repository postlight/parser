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
import { PoliticoExtractor } from './custom/www.politico.com';
import { DeadspinExtractor } from './custom/deadspin.com';
import { BroadwayWorldExtractor } from './custom/www.broadwayworld.com';
import { ApartmentTherapyExtractor } from './custom/www.apartmenttherapy.com';

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
  'www.politico.com': PoliticoExtractor,
  'deadspin.com': DeadspinExtractor,
  'jezebel.com': DeadspinExtractor,
  'lifehacker.com': DeadspinExtractor,
  'kotaku.com': DeadspinExtractor,
  'gizmodo.com': DeadspinExtractor,
  'jalopnik.com': DeadspinExtractor,
  'www.broadwayworld.com': BroadwayWorldExtractor,
  'www.apartmenttherapy.com': ApartmentTherapyExtractor,
};

export default Extractors;
