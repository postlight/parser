import { SUPPORTED_CONTENT_TYPES, SUPPORTED_CONTENT_TYPES_RE } from './constants';

// check a string for its mime type
export default function getSupportedMime(str) {
  if (SUPPORTED_CONTENT_TYPES_RE.test(str)) {
    return SUPPORTED_CONTENT_TYPES_RE.exec(str)[1];
  }
  return false;
}
