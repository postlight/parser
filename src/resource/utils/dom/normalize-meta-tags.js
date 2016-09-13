function convertMetaProp($, from, to) {
  $(`meta[${from}]`).each((_, node) => {
    const $node = $(node);

    const value = $node.attr(from);
    $node.attr(to, value);
    $node.removeAttr(from);
  });

  return $;
}

// For ease of use in extracting from meta tags,
// replace the "content" attribute on meta tags with the
// "value" attribute.
//
// In addition, normalize 'property' attributes to 'name' for ease of
// querying later. See, e.g., og or twitter meta tags.

export default function normalizeMetaTags($) {
  $ = convertMetaProp($, 'content', 'value');
  $ = convertMetaProp($, 'property', 'name');
  return $;
}
