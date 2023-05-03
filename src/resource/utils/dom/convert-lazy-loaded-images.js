import { getAttrs } from 'utils/dom';

import { IS_LINK, IS_IMAGE, IS_SRCSET } from './constants';

// Convert all instances of images with potentially
// lazy loaded images into normal images.
// Many sites will have img tags with no source, or an image tag with a src
// attribute that a is a placeholer. We need to be able to properly fill in
// the src attribute so the images are no longer lazy loaded.
export default function convertLazyLoadedImages($) {
  const extractSrcFromJSON = str => {
    try {
      const { src } = JSON.parse(str);
      if (typeof src === 'string') return src;
    } catch (_) {
      return false;
    }

    return false;
  };

  $('img').each((_, img) => {
    const attrs = getAttrs(img);

    Reflect.ownKeys(attrs).forEach(attr => {
      const value = attrs[attr];

      if (attr !== 'srcset' && IS_LINK.test(value) && IS_SRCSET.test(value)) {
        $(img).attr('srcset', value);
      } else if (
        attr !== 'src' &&
        attr !== 'srcset' &&
        IS_LINK.test(value) &&
        IS_IMAGE.test(value)
      ) {
        // Is the value a JSON object? If so, we should attempt to extract the image src from the data.
        const existingSrc = extractSrcFromJSON(value);
        if (existingSrc) {
          $(img).attr('src', existingSrc);
        } else {
          $(img).attr('src', value);
        }
      }
    });
  });

  return $;
}
