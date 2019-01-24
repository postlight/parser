import { stripTags } from 'utils/dom';
import { excerptContent, normalizeSpaces } from 'utils/text';

import { TEXT_LINK_RE } from './constants';

// Take a dek HTML fragment, and return the cleaned version of it.
// Return None if the dek wasn't good enough.
export default function cleanDek(dek, { $, excerpt }) {
  // Sanity check that we didn't get too short or long of a dek.
  if (dek.length > 1000 || dek.length < 5) return null;

  // Check that dek isn't the same as excerpt
  if (excerpt && excerptContent(excerpt, 10) === excerptContent(dek, 10))
    return null;

  const dekText = stripTags(dek, $);

  // Plain text links shouldn't exist in the dek. If we have some, it's
  // not a good dek - bail.
  if (TEXT_LINK_RE.test(dekText)) return null;

  return normalizeSpaces(dekText.trim());
}
