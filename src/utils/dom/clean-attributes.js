import { WHITELIST_ATTRS_RE } from './constants';

function removeAllButWhitelist($article) {
  // $('*', article).each((index, node) => {
  $article.find('*').each((index, node) => {
    node.attribs = Reflect.ownKeys(node.attribs).reduce((acc, attr) => {
      if (WHITELIST_ATTRS_RE.test(attr)) {
        return { ...acc, [attr]: node.attribs[attr] };
      }

      return acc;
    }, {});
  });
}

// function removeAttrs(article, $) {
//   REMOVE_ATTRS.forEach((attr) => {
//     $(`[${attr}]`, article).removeAttr(attr);
//   });
// }

// Remove attributes like style or align
export default function cleanAttributes($article) {
  removeAllButWhitelist($article);

  return $article;
}
