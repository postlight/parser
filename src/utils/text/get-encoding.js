import { ENCODING_RE } from './constants';

// check a string for encoding; this is
// used in our fetchResource function to
// ensure correctly encoded responses
export default function getEncoding(str) {
  if (ENCODING_RE.test(str)) {
    return ENCODING_RE.exec(str)[1];
  }

  return 'utf-8';
}
