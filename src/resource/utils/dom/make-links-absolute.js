import URL from 'url'

export default function makeLinksAbsolute($, url) {
  ['href', 'src'].forEach(attr => absolutize($, url, attr))
  return $
}

function absolutize($, url, attr) {
  $(`[${attr}]`).each((_, node) => {
    const $node = $(node)
    $node.attr(attr, URL.resolve(url, $node.attr(attr)))
  })
}
