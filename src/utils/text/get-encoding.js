import iconv from 'iconv-lite';
import { DEFAULT_ENCODING, ENCODING_RE } from './constants';

// check a string for encoding; this is
// used in our fetchResource function to
// ensure correctly encoded responses
export default function getEncoding(str) {
  let encoding = DEFAULT_ENCODING;
  if (ENCODING_RE.test(str)) {
    const testEncode = ENCODING_RE.exec(str)[1];
    if (iconv.encodingExists(testEncode)) {
      encoding = testEncode;
    }
  }
  return encoding;
}
