import {
  REMOVE_ATTR_SELECTORS,
  REMOVE_ATTR_LIST,
  REMOVE_ATTRS,
} from './constants'

// Remove attributes like style or align
export default function cleanAttributes(article, $) {
  REMOVE_ATTRS.forEach((attr) => {
    $(`[${attr}]`, article).removeAttr(attr)
  })

  return $
}
