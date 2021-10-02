import { normalizeSpaces } from '../utils/text';
import { CLEAN_AUTHOR_RE } from './constants';

// Take an author string (like 'By David Smith ') and clean it to
// just the name(s): 'David Smith'.
export function cleanAuthor(author: string) {
  return normalizeSpaces(author.replace(CLEAN_AUTHOR_RE, '$2').trim());
}
