import {
  getAttrs,
  setAttrs,
} from 'utils/dom';

import { WHITELIST_ATTRS_RE } from './constants';

function removeAllButWhitelist($article) {
  $article.find('*').each((index, node) => {
    const attrs = getAttrs(node);

    setAttrs(node, Reflect.ownKeys(attrs).reduce((acc, attr) => {
      if (WHITELIST_ATTRS_RE.test(attr)) {
        return { ...acc, [attr]: attrs[attr] };
      }

      return acc;
    }, {}));
  });

  return $article;
}

// function removeAttrs(article, $) {
//   REMOVE_ATTRS.forEach((attr) => {
//     $(`[${attr}]`, article).removeAttr(attr);
//   });
// }

// Remove attributes like style or align
export default function cleanAttributes($article) {
  // Grabbing the parent because at this point
  // $article will be wrapped in a div which will
  // have a score set on it.
  return removeAllButWhitelist(
    $article.parent().length ?
      $article.parent() : $article
  );
}
