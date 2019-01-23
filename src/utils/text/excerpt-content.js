export default function excerptContent(content, words = 10) {
  return content
    .trim()
    .split(/\s+/)
    .slice(0, words)
    .join(' ');
}
