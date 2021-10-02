import { SPACER_RE } from './constants';

function cleanForHeight($img: cheerio.Cheerio, $: cheerio.Root) {
  const height = parseInt($img.attr('height') ?? '0', 10);
  const width = parseInt($img.attr('width') ?? '0', 10) || 20;

  // Remove images that explicitly have very small heights or
  // widths, because they are most likely shims or icons,
  // which aren't very useful for reading.
  if ((height || 20) < 10 || width < 10) {
    $img.remove();
  } else if (height) {
    // Don't ever specify a height on images, so that we can
    // scale with respect to width without screwing up the
    // aspect ratio.
    $img.removeAttr('height');
  }

  return $;
}

// Cleans out images where the source string matches transparent/spacer/etc
// TODO This seems very aggressive - AP
function removeSpacers($img: cheerio.Cheerio, $: cheerio.Root) {
  const src = $img.attr('src')
  if (src && SPACER_RE.test(src)) {
    $img.remove();
  }

  return $;
}

export function cleanImages($article: cheerio.Cheerio, $: cheerio.Root) {
  $article.find('img').each((index, img) => {
    const $img = $(img);

    cleanForHeight($img, $);
    removeSpacers($img, $);
  });

  return $;
}
