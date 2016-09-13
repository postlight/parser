const NORMALIZE_RE = /\s{2,}/;

export default function normalizeSpaces(text) {
  return text.replace(NORMALIZE_RE, ' ').trim();
}
