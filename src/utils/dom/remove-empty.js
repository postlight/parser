export default function removeEmpty($article, $) {
  $article.find('p').each((index, p) => {
    const $p = $(p);
    if ($p.find('iframe, img').length === 0 && $p.text().trim() === '')
      $p.remove();
  });

  return $;
}
