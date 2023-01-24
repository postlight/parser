export function excerptContent(content, words = 10) {
  return content
    .trim()
    .split(/\s+/)
    .slice(0, words)
    .join(' ');
}

export function excerptContentRange(content, start, end) {
  return content
    .trim()
    .split(/\s+/)
    .slice(start, end)
    .join(' ');
}

export default {
  excerptContent,
  excerptContentRange,
};
