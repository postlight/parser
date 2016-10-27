// Given a string, return True if it appears to have an ending sentence
// within it, false otherwise.
const SENTENCE_END_RE = new RegExp('.( |$)');
export default function hasSentenceEnd(text) {
  return SENTENCE_END_RE.test(text);
}
