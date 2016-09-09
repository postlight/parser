import { REMOVE_EMPTY_SELECTORS } from './constants'

export default function removeEmpty($article, $) {
  // $(REMOVE_EMPTY_SELECTORS, $article).remove()

  $article.find('p').each((index, p) => {
    const $p = $(p)
    if ($p.text().trim() === '') $p.remove()
  })

  return $
}
