import { extractFromMeta } from 'utils/dom';
import { cleanImage } from 'cleaners';

import {
  LEAD_IMAGE_URL_META_TAGS,
  LEAD_IMAGE_URL_SELECTORS,
} from './constants';

import {
  scoreImageUrl,
  scoreAttr,
  scoreByParents,
  scoreBySibling,
  scoreByDimensions,
  scoreByPosition,
} from './score-image';

// Given a resource, try to find the lead image URL from within
// it. Like content and next page extraction, uses a scoring system
// to determine what the most likely image may be. Short circuits
// on really probable things like og:image meta tags.
//
// Potential signals to still take advantage of:
//   * domain
//   * weird aspect ratio
const GenericLeadImageUrlExtractor = {
  extract({ $, content, metaCache, html }) {
    let cleanUrl;
    if (!$.browser && $('head').length === 0) {
      $('*')
        .first()
        .prepend(html);
    }

    // Check to see if we have a matching meta tag that we can make use of.
    // Moving this higher because common practice is now to use large
    // images on things like Open Graph or Twitter cards.
    // images usually have for things like Open Graph.
    const imageUrl = extractFromMeta(
      $,
      LEAD_IMAGE_URL_META_TAGS,
      metaCache,
      false
    );

    if (imageUrl) {
      cleanUrl = cleanImage(imageUrl);

      if (cleanUrl) return cleanUrl;
    }

    // Next, try to find the "best" image via the content.
    // We'd rather not have to fetch each image and check dimensions,
    // so try to do some analysis and determine them instead.
    const $content = $(content);
    const imgs = $('img', $content).toArray();
    const imgScores = {};

    imgs.forEach((img, index) => {
      const $img = $(img);
      const src = $img.attr('src');

      if (!src) return;

      let score = scoreImageUrl(src);
      score += scoreAttr($img);
      score += scoreByParents($img);
      score += scoreBySibling($img);
      score += scoreByDimensions($img);
      score += scoreByPosition(imgs, index);

      imgScores[src] = score;
    });

    const [topUrl, topScore] = Reflect.ownKeys(imgScores).reduce(
      (acc, key) => (imgScores[key] > acc[1] ? [key, imgScores[key]] : acc),
      [null, 0]
    );

    if (topScore > 0) {
      cleanUrl = cleanImage(topUrl);

      if (cleanUrl) return cleanUrl;
    }

    // If nothing else worked, check to see if there are any really
    // probable nodes in the doc, like <link rel="image_src" />.
    // eslint-disable-next-line no-restricted-syntax
    for (const selector of LEAD_IMAGE_URL_SELECTORS) {
      const $node = $(selector).first();
      const src = $node.attr('src');
      if (src) {
        cleanUrl = cleanImage(src);
        if (cleanUrl) return cleanUrl;
      }

      const href = $node.attr('href');
      if (href) {
        cleanUrl = cleanImage(href);
        if (cleanUrl) return cleanUrl;
      }

      const value = $node.attr('value');
      if (value) {
        cleanUrl = cleanImage(value);
        if (cleanUrl) return cleanUrl;
      }
    }

    return null;
  },
};

export default GenericLeadImageUrlExtractor;
