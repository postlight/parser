import { REMOVE_EMPTY_TAGS } from './constants';

export default function removeEmpty($article, $) {
  $article.find(REMOVE_EMPTY_TAGS.join(',')).each((index, p) => {
    const $p = $(p);
    if ($p.text().trim() === '') $p.remove();
  });

  return $;
}
