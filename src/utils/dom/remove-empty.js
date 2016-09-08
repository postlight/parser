import { REMOVE_EMPTY_SELECTORS } from './constants'

export default function removeEmpty(article, $) {
  $(REMOVE_EMPTY_SELECTORS, article).remove()

  return $
}
