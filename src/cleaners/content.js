import {
  cleanAttributes,
  cleanHeaders,
  cleanHOnes,
  cleanImages,
  cleanTags,
  removeEmpty,
  rewriteTopLevel,
  markToKeep,
  stripJunkTags,
  makeLinksAbsolute,
} from 'utils/dom';

// Clean our article content, returning a new, cleaned node.
export default function extractCleanNode(
  article,
  { $, cleanConditionally = true, title = '', url = '', defaultCleaner = true }
) {
  // Rewrite the tag name to div if it's a top level node like body or
  // html to avoid later complications with multiple body tags.
  rewriteTopLevel(article, $);

  // Drop small images and spacer images
  // Only do this is defaultCleaner is set to true;
  // this can sometimes be too aggressive.
  if (defaultCleaner) cleanImages(article, $);

  // Make links absolute
  makeLinksAbsolute(article, $, url);

  // Mark elements to keep that would normally be removed.
  // E.g., stripJunkTags will remove iframes, so we're going to mark
  // YouTube/Vimeo videos as elements we want to keep.
  markToKeep(article, $, url);

  // Drop certain tags like <title>, etc
  // This is -mostly- for cleanliness, not security.
  stripJunkTags(article, $);

  // H1 tags are typically the article title, which should be extracted
  // by the title extractor instead. If there's less than 3 of them (<3),
  // strip them. Otherwise, turn 'em into H2s.
  cleanHOnes(article, $);

  // Clean headers
  cleanHeaders(article, $, title);

  // We used to clean UL's and OL's here, but it was leading to
  // too many in-article lists being removed. Consider a better
  // way to detect menus particularly and remove them.
  // Also optionally running, since it can be overly aggressive.
  if (defaultCleaner) cleanTags(article, $, cleanConditionally);

  // Remove empty paragraph nodes
  removeEmpty(article, $);

  // Remove unnecessary attributes
  cleanAttributes(article, $);

  return article;
}
