import URL from 'url'

import Extractors from './all'

export default function getExtractor(url) {
  const parsedUrl = URL.parse(url)
  const { hostname } = parsedUrl

  return Extractors[hostname] || Extractors['*']
}
