import {
  POSITIVE_LEAD_IMAGE_URL_HINTS_RE,
  NEGATIVE_LEAD_IMAGE_URL_HINTS_RE,
  GIF_RE,
  JPG_RE,
} from './constants';

import { PHOTO_HINTS_RE } from '../content/scoring/constants';

function getSig($node: cheerio.Cheerio) {
  return `${$node.attr('class') || ''} ${$node.attr('id') || ''}`;
}

// Scores image urls based on a variety of heuristics.
export function scoreImageUrl(url: string) {
  url = url.trim();
  let score = 0;

  if (POSITIVE_LEAD_IMAGE_URL_HINTS_RE.test(url)) {
    score += 20;
  }

  if (NEGATIVE_LEAD_IMAGE_URL_HINTS_RE.test(url)) {
    score -= 20;
  }

  // TODO: We might want to consider removing this as
  // gifs are much more common/popular than they once were
  if (GIF_RE.test(url)) {
    score -= 10;
  }

  if (JPG_RE.test(url)) {
    score += 10;
  }

  // PNGs are neutral.

  return score;
}

// Alt attribute usually means non-presentational image.
export function scoreAttr($img: cheerio.Cheerio) {
  if ($img.attr('alt')) {
    return 5;
  }

  return 0;
}

// Look through our parent and grandparent for figure-like
// container elements, give a bonus if we find them
export function scoreByParents($img: cheerio.Cheerio) {
  let score = 0;
  const $figParent = $img.parents('figure').first();

  if ($figParent.length === 1) {
    score += 25;
  }

  const $parent = $img.parent();
  let $gParent: cheerio.Cheerio | undefined;
  if ($parent.length === 1) {
    $gParent = $parent.parent();
  }

  [$parent, $gParent].forEach($node => {
    if ($node && PHOTO_HINTS_RE.test(getSig($node))) {
      score += 15;
    }
  });

  return score;
}

// Look at our immediate sibling and see if it looks like it's a
// caption. Bonus if so.
export function scoreBySibling($img: cheerio.Cheerio) {
  let score = 0;
  const $sibling = $img.next();
  const sibling = $sibling.get(0);

  if (sibling && sibling.tagName.toLowerCase() === 'figcaption') {
    score += 25;
  }

  if (PHOTO_HINTS_RE.test(getSig($sibling))) {
    score += 15;
  }

  return score;
}

export function scoreByDimensions($img: cheerio.Cheerio) {
  let score = 0;

  const width = parseFloat($img.attr('width') ?? '0');
  const height = parseFloat($img.attr('height') ?? '0');
  const src = $img.attr('src');

  // Penalty for skinny images
  if (width && width <= 50) {
    score -= 50;
  }

  // Penalty for short images
  if (height && height <= 50) {
    score -= 50;
  }

  if (width && height && src && !src.includes('sprite')) {
    const area = width * height;
    if (area < 5000) {
      // Smaller than 50 x 100
      score -= 100;
    } else {
      score += Math.round(area / 1000);
    }
  }

  return score;
}

export function scoreByPosition($imgs: cheerio.Element[], index: number) {
  return $imgs.length / 2 - index;
}
