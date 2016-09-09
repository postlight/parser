import 'babel-polyfill'

import {
  REMOVE_ATTR_SELECTORS,
  REMOVE_ATTR_LIST,
  REMOVE_ATTRS,
  WHITELIST_ATTRS_RE,
} from './constants'

// Remove attributes like style or align
export default function cleanAttributes($article, $) {
  removeAllButWhitelist($article, $)

  return $
}

function removeAllButWhitelist($article, $) {
  // $('*', article).each((index, node) => {
  $article.find('*').each((index, node) => {
    node.attribs = Reflect.ownKeys(node.attribs).reduce((acc, attr) => {
      if (WHITELIST_ATTRS_RE.test(attr)) {
        return { ...acc, [attr]: node.attribs[attr] }
      } else {
        return acc
      }
    }, {})
  })
}

function removeAttrs(article, $) {
  REMOVE_ATTRS.forEach((attr) => {
    $(`[${attr}]`, article).removeAttr(attr)
  })
}
