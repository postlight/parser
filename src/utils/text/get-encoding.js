import iconv from 'iconv-lite';
import { DEFAULT_ENCODING, ENCODING_RE } from './constants';

// check a string for encoding; this is
// used in our fetchResource function to
// ensure correctly encoded responses
export default function getEncoding(str) {
  let encoding = DEFAULT_ENCODING;
  const matches = ENCODING_RE.exec(str);
  if (matches !== null) {
    [, str] = matches;
  }
  if (iconv.encodingExists(str)) {
    encoding = str;
  }
  return encoding;
}
