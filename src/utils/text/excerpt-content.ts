export function excerptContent(content: string, words = 10) {
  return content
    .trim()
    .split(/\s+/)
    .slice(0, words)
    .join(' ');
}
