import { getAttrs } from 'utils/dom';

import { IS_LINK, IS_IMAGE } from './constants';

// Convert all instances of images with potentially
// lazy loaded images into normal images.
// Many sites will have img tags with no source, or an image tag with a src
// attribute that a is a placeholer. We need to be able to properly fill in
// the src attribute so the images are no longer lazy loaded.
export default function convertLazyLoadedImages($) {
  $('img').each((_, img) => {
    const attrs = getAttrs(img);

    Reflect.ownKeys(attrs).forEach(attr => {
      const value = attrs[attr];

      if (attr !== 'src' && IS_LINK.test(value) && IS_IMAGE.test(value)) {
        $(img).attr('src', value);
      }
    });
  });

  return $;
}
