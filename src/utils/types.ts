export const isTagElement = (
  element: cheerio.Element
): element is cheerio.TagElement =>
  typeof (element as any).tagName === 'string';
