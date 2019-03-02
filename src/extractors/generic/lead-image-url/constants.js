// An ordered list of meta tag names that denote likely article leading images.
// All attributes should be lowercase for faster case-insensitive matching.
// From most distinct to least distinct.
export const LEAD_IMAGE_URL_META_TAGS = [
  'og:image',
  'twitter:image',
  'image_src',
];

export const LEAD_IMAGE_URL_SELECTORS = ['link[rel=image_src]'];

export const POSITIVE_LEAD_IMAGE_URL_HINTS = [
  'upload',
  'wp-content',
  'large',
  'photo',
  'wp-image',
];
export const POSITIVE_LEAD_IMAGE_URL_HINTS_RE = new RegExp(
  POSITIVE_LEAD_IMAGE_URL_HINTS.join('|'),
  'i'
);

export const NEGATIVE_LEAD_IMAGE_URL_HINTS = [
  'spacer',
  'sprite',
  'blank',
  'throbber',
  'gradient',
  'tile',
  'bg',
  'background',
  'icon',
  'social',
  'header',
  'hdr',
  'advert',
  'spinner',
  'loader',
  'loading',
  'default',
  'rating',
  'share',
  'facebook',
  'twitter',
  'theme',
  'promo',
  'ads',
  'wp-includes',
];
export const NEGATIVE_LEAD_IMAGE_URL_HINTS_RE = new RegExp(
  NEGATIVE_LEAD_IMAGE_URL_HINTS.join('|'),
  'i'
);

export const GIF_RE = /\.gif(\?.*)?$/i;
export const JPG_RE = /\.jpe?g(\?.*)?$/i;
