import textExtractor from 'extractors/files/text-file';

import getSupportedMime from '../utils/text/get-supported-mime';

export default function checkByFile(headers) {
  if (headers) {
    switch (getSupportedMime(headers['content-type'])) {
      case 'text/plain':
        return textExtractor;
      default:
        break;
    }
  }
  return false;
}
