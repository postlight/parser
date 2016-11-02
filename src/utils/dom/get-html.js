export default function getHtml($, $node) {
  // if this is cheerio
  if ($.html) {
    return $.html($node);
  }

  // if this is jquery
  return $('<div />').append($node.clone()).html();
}
