const NORMALIZE_RE = /\s{2,}/g;

export default function normalizeSpaces(text) {
  return text.replace(NORMALIZE_RE, ' ').trim();
}
