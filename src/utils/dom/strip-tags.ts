// strips all tags from a string of text
export function stripTags(text: string, $: cheerio.Root) {
  // Wrapping text in html element prevents errors when text
  // has no html
  const cleanText = $(`<span>${text}</span>`).text();
  return cleanText === '' ? text : cleanText;
}
