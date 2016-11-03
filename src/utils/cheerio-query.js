/* eslint-disable */
import jQuery from 'jquery';

const PARSER_CLASS = 'mercury-parsing-container';

jQuery.noConflict();
const $ = (selector, context, rootjQuery, contextOverride = true) => {
  if (contextOverride) {
    if (context && typeof context === 'string') {
      context = `.${PARSER_CLASS} ${context}`
    } else {
      context = `.${PARSER_CLASS}`
    }
  }
  return new jQuery.fn.init(selector, context, rootjQuery);
};

$.fn = $.prototype = jQuery.fn;
jQuery.extend($, jQuery); // copy's trim, extend etc to $

$.cloneHtml = ($node) => {
  return $('html', null, null, false).clone().children().wrap('<div />').wrap('<div />')
  // return $('html', null, null, false).clone().children().wrap('<div />').wrap('<div />')
}

$.html = ($node) => {
  if ($node) {
    return $('<div />').append($node.clone()).html();
  }

  const body = $('body', null, null, false).clone()
  const head = $('head', null, null, false).clone()
  const html = $('<div />')
    .append($(`<div>${head.html()}</div>`))
    .append($(`<div>${body.html()}</div>`))
    .wrap('<div />')
    .parent()
    .html()

  return html
}

$.cleanup = () => {
  $(`.${PARSER_CLASS}`, null, null, false).remove()
}

$.load = (html, opts = {}, returnHtml = false) => {
  const { normalizeWhitespace } = opts

  if (!html) {
    html = $.cloneHtml()
  } else {
    if (normalizeWhitespace) {
      html = html.replace(/[\s\n\r]+/g, ' ')
    }

    html = $('<div />').html(html)
  }

  const $body = $('body', null, null, false)
  // $('script', null, null, false).remove()
  let $parsingNode = $body.find(`.${PARSER_CLASS}`)

  if (!$parsingNode[0]) {
    $body.append(`<div class="${PARSER_CLASS}" style="display: none;" />`);
    $parsingNode = $body.find(`.${PARSER_CLASS}`)
  }

  html.find('script').remove()
  $parsingNode.html(html);

  if (returnHtml) return { $, html: html.html() }

  return $
}

export default $;
