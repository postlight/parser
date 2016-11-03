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
  extract({ $, content, metaCache, html, browser = false }) {
    let cleanUrl;
    if (!browser && $('head').length === 0) {
      $('*').first().prepend(html);
    }

    // Check to see if we have a matching meta tag that we can make use of.
    // Moving this higher because common practice is now to use large
    // images on things like Open Graph or Twitter cards.
    // images usually have for things like Open Graph.
    const imageUrl =
      extractFromMeta(
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

    const [topUrl, topScore] =
      Reflect.ownKeys(imgScores).reduce((acc, key) =>
        imgScores[key] > acc[1] ? [key, imgScores[key]] : acc
      , [null, 0]);

    if (topScore > 0) {
      cleanUrl = cleanImage(topUrl);

      if (cleanUrl) return cleanUrl;
    }

    // If nothing else worked, check to see if there are any really
    // probable nodes in the doc, like <link rel="image_src" />.
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

// def extract(self):
//     """
//     # First, try to find the "best" image via the content.
//     # We'd rather not have to fetch each image and check dimensions,
//     # so try to do some analysis and determine them instead.
//     content = self.extractor.extract_content(return_type="node")
//     imgs = content.xpath('.//img')
//     img_scores = defaultdict(int)
//     logger.debug('Scoring %d images from content', len(imgs))
//     for (i, img) in enumerate(imgs):
//         img_score = 0
//
//         if not 'src' in img.attrib:
//             logger.debug('No src attribute found')
//             continue
//
//         try:
//             parsed_img = urlparse(img.attrib['src'])
//             img_path = parsed_img.path.lower()
//         except ValueError:
//             logger.debug('ValueError getting img path.')
//             continue
//         logger.debug('Image path is %s', img_path)
//
//         if constants.POSITIVE_LEAD_IMAGE_URL_HINTS_RE.match(img_path):
//             logger.debug('Positive URL hints match. Adding 20.')
//             img_score += 20
//
//         if constants.NEGATIVE_LEAD_IMAGE_URL_HINTS_RE.match(img_path):
//             logger.debug('Negative URL hints match. Subtracting 20.')
//             img_score -= 20
//
//         # Gifs are more often structure than photos
//         if img_path.endswith('gif'):
//             logger.debug('gif found. Subtracting 10.')
//             img_score -= 10
//
//         # JPGs are more often photographs
//         if img_path.endswith('jpg'):
//             logger.debug('jpg found. Adding 10.')
//             img_score += 10
//
//         # PNGs are neutral.
//
//         # Alt attribute usually means non-presentational image.
//         if 'alt' in img.attrib and len(img.attrib['alt']) > 5:
//             logger.debug('alt attribute found. Adding 5.')
//             img_score += 5
//
//         # Look through our parent and grandparent for figure-like
//         # container elements, give a bonus if we find them
//         parents = [img.getparent()]
//         if parents[0] is not None and parents[0].getparent() is not None:
//             parents.append(parents[0].getparent())
//         for p in parents:
//             if p.tag == 'figure':
//                 logger.debug('Parent with <figure> tag found. Adding 25.')
//                 img_score += 25
//
//             p_sig = ' '.join([p.get('id', ''), p.get('class', '')])
//             if constants.PHOTO_HINTS_RE.search(p_sig):
//                 logger.debug('Photo hints regex match. Adding 15.')
//                 img_score += 15
//
//         # Look at our immediate sibling and see if it looks like it's a
//         # caption. Bonus if so.
//         sibling = img.getnext()
//         if sibling is not None:
//             if sibling.tag == 'figcaption':
//                 img_score += 25
//
//             sib_sig = ' '.join([sibling.get('id', ''),
//                                 sibling.get('class', '')]).lower()
//             if 'caption' in sib_sig:
//                 img_score += 15
//
//         # Pull out width/height if they were set.
//         img_width = None
//         img_height = None
//         if 'width' in img.attrib:
//             try:
//                 img_width = float(img.get('width'))
//             except ValueError:
//                 pass
//         if 'height' in img.attrib:
//             try:
//                 img_height = float(img.get('height'))
//             except ValueError:
//                 pass
//
//         # Penalty for skinny images
//         if img_width and img_width <= 50:
//             logger.debug('Skinny image found. Subtracting 50.')
//             img_score -= 50
//
//         # Penalty for short images
//         if img_height and img_height <= 50:
//             # Wide, short images are more common than narrow, tall ones
//             logger.debug('Short image found. Subtracting 25.')
//             img_score -= 25
//
//         if img_width and img_height and not 'sprite' in img_path:
//             area = img_width * img_height
//
//             if area < 5000: # Smaller than 50x100
//                 logger.debug('Image with small area found. Subtracting 100.')
//                 img_score -= 100
//             else:
//                 img_score += round(area/1000.0)
//
//         # If the image is higher on the page than other images,
//         # it gets a bonus. Penalty if lower.
//         logger.debug('Adding page placement bonus of %d.', len(imgs)/2 - i)
//         img_score += len(imgs)/2 - i
//
//         # Use the raw src here because we munged img_path for case
//         # insensitivity
//         logger.debug('Final score is %d.', img_score)
//         img_scores[img.attrib['src']] += img_score
//
//     top_score = 0
//     top_url = None
//     for (url, score) in img_scores.items():
//         if score > top_score:
//             top_url = url
//             top_score = score
//
//     if top_score > 0:
//         logger.debug('Using top score image from content. Score was %d', top_score)
//         return top_url
//
//
//     # If nothing else worked, check to see if there are any really
//     # probable nodes in the doc, like <link rel="image_src" />.
//     logger.debug('Trying to find lead image in probable nodes')
//     for selector in constants.LEAD_IMAGE_URL_SELECTORS:
//         nodes = self.resource.extract_by_selector(selector)
//         for node in nodes:
//             clean_value = None
//             if node.attrib.get('src'):
//                 clean_value = self.clean(node.attrib['src'])
//
//             if not clean_value and node.attrib.get('href'):
//                 clean_value = self.clean(node.attrib['href'])
//
//             if not clean_value and node.attrib.get('value'):
//                 clean_value = self.clean(node.attrib['value'])
//
//             if clean_value:
//                 logger.debug('Found lead image in probable nodes.')
//                 logger.debug('Node was: %s', node)
//                 return clean_value
//
//     return None
