import { TEXT_LINK_RE } from './constants'
import { stripTags } from '../../utils'

// Take a dek HTML fragment, and return the cleaned version of it.
// Return None if the dek wasn't good enough.
export default function cleanDek(dek, $) {
  // Sanity check that we didn't get too short or long of a dek.
  if (dek.length > 1000 || dek.length < 5) return null

  const dekText = stripTags(dek, $)

  // Plain text links shouldn't exist in the dek. If we have some, it's
  // not a good dek - bail.
  if (TEXT_LINK_RE.test(dekText)) return null

  return dekText.trim()
}
