import { paragraphize } from './index';

// ## NOTES:
// Another good candidate for refactoring/optimizing.
// Very imperative code, I don't love it. - AP

//  Given cheerio object, convert consecutive <br /> tags into
//  <p /> tags instead.
//
//  :param $: A cheerio object

export function brsToPs($: cheerio.Root) {
  let collapsing = false;
  $('br').each((index, element) => {
    const $element = $(element);
    const nextElement = $element.next().get(0) as
      | cheerio.TagElement
      | undefined;

    if (nextElement && nextElement.tagName.toLowerCase() === 'br') {
      collapsing = true;
      $element.remove();
    } else if (collapsing) {
      collapsing = false;
      paragraphize(element, $, true);
    }
  });

  return $;
}
