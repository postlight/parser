export default function removeEmpty($article, $) {
  $article.find('p').each((index, p) => {
    const $p = $(p);
    if ($p.text().trim() === '') $p.remove();
  });

  return $;
}
