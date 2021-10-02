export const IS_LINK = new RegExp('https?://', 'i');
const IMAGE_RE = '.(png|gif|jpe?g)';
export const IS_IMAGE = new RegExp(`${IMAGE_RE}`, 'i');
export const IS_SRCSET = new RegExp(
  `${IMAGE_RE}(\\?\\S+)?(\\s*[\\d.]+[wx])`,
  'i'
);

export const TAGS_TO_REMOVE = ['script', 'style', 'form'].join(',');
