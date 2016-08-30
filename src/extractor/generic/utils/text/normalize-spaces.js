const NORMALIZE_RE = new RegExp('\s{2,}')

export default function normalizeSpaces(text) {
  return text.replace(NORMALIZE_RE, ' ').trim()
}
