import { convertNodeTo } from 'utils/dom';

// Rewrite the tag name to div if it's a top level node like body or
// html to avoid later complications with multiple body tags.
export default function rewriteTopLevel(article, $) {
  // I'm not using context here because
  // it's problematic when converting the
  // top-level/root node - AP
  $ = convertNodeTo($('html'), $, 'div');
  $ = convertNodeTo($('body'), $, 'div');

  return $;
}
