import { brsToPs } from './index'
import { DIV_TO_P_BLOCK_TAGS } from '../constants'
// Loop through the provided doc, and convert any p-like elements to
// actual paragraph tags.
//
//   Things fitting this criteria:
//   * Multiple consecutive <br /> tags.
//   * <div /> tags without block level elements inside of them
//   * <span /> tags who are not children of <p /> or <div /> tags.
//
//   :param $: A cheerio object to search
//   :return cheerio object with new p elements
//   (By-reference mutation, though. Returned just for convenience.)

export function convertToParagraphs($) {
  $ = brsToPs($)
  $ = convertDivs($)
  $ = convertSpans($)

  return $
}

function convertDivs($) {
  $('div').each((index, div) => {
    const convertable = $(div).children()
      .not(DIV_TO_P_BLOCK_TAGS).length == 0
    if (convertable) {
      convertNodeTo(div, $, 'p')
    }
  })

  return $
}

function convertSpans($) {
  $('span').each((index, span) => {
    const convertable = $(span).parents('p, div').length == 0
    if (convertable) {
      convertNodeTo(span, $, 'p')
    }
  })

  return $
}

export function convertNodeTo(node, $, tag='p') {
  $(node).replaceWith(`<${tag}>${$(node).contents()}</${tag}>`)
  return $
}
