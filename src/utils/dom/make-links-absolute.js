import URL from 'url'

export default function makeLinksAbsolute($content, $, url) {
  ['href', 'src'].forEach(attr => absolutize($, url, attr, $content))

  // console.log($content.html())
  return $content
}

function absolutize($, rootUrl, attr, $content) {
  $(`[${attr}]`, $content).each((_, node) => {
    const url = node.attribs[attr]
    const absoluteUrl = URL.resolve(rootUrl, url)

    node.attribs[attr] = absoluteUrl
  })
}
