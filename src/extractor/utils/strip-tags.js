// strips all tags from a string of text
export default function stripTags(text, $) {
  const cleanText = $(text).text()
  return cleanText === '' ? text : cleanText
}
