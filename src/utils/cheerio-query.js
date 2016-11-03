/* eslint-disable */
import jQuery from 'jquery';

const PARSER_CLASS = 'mercury-parsing';

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

$.load = (html, returnHtml = false) => {
  if (!html) {
    html = $('html', null, null, false).clone()
  }

  const $body = $('body', null, null, false)
  let $parsingNode = $body.find(`.${PARSER_CLASS}`)

  if (!$parsingNode[0]) {
    $body.append(`<div class="${PARSER_CLASS}" style="display: none;" />`);
    $parsingNode = $body.find(`.${PARSER_CLASS}`)
  }

  $parsingNode.html(html);

  if (returnHtml) return { $, html: html.html() }

  return $
}

export default $;
