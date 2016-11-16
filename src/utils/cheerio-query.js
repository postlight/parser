/* eslint-disable */
import jQuery from 'jquery';

const PARSER_CLASS = 'mercury-parsing-container';

jQuery.noConflict();
const $ = (selector, context, rootjQuery, contextOverride = true) => {
  if (contextOverride) {
    if (context && typeof context === 'string') {
      context = `.${PARSER_CLASS} ${context}`
    } else if (!context) {
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

$.root = () => {
  return $('*').first()
}

$.browser = true


const isContainer = ($node) => {
  const el = $node.get(0)
  if (el) {
    return el.tagName.toLowerCase() === 'container'
  }

  return false
}

$.html = ($node) => {
  if ($node) {
    const $parent = $node.parent()

    // verify that parent is inside parsing container
    // console.log('in right place?', $parent.html())
    // console.log('in right place?', $parent.parents().length)
    if ($parent.parents(`.${PARSER_CLASS}`).length > 0 && $parent.get(0).tagName.toLowerCase() !== 'container') {
      // console.log('do it in here')
      // console.log($parent.get(0).tagName)
      return $node.parent().clone().html() || $node.clone().html();
    } else {
      // console.log('doing it here')
      // console.log($node.children().html())
      if (isContainer($node) || isContainer($node.children('container'))) {
        return $node.children('container').clone().html()
      }

      return $node.clone().html()
    }

    return $node.clone().html();
  }

  const $body = $('body', null, null, false).clone()
  const $head = $('head', null, null, false).clone()
  const $parsingNode = $body.find(`.${PARSER_CLASS}`)

  if ($parsingNode.length > 0) {
    // return $('<div />').html($parsingNode).html()
    return $parsingNode.children().html()
  }

  const html = $('<container />')
    .append($(`<container>${$head.html()}</container>`))
    .append($(`<container>${$body.html()}</container>`))
    .wrap('<container />')
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
      if (typeof html === 'string') {
        html = html.replace(/[\s\n\r]+/g, ' ')
      }
    }

    html = $('<container />').html(html)
  }

  const $body = $('body', null, null, false)
  // $('script', null, null, false).remove()
  let $parsingNode = $body.find(`.${PARSER_CLASS}`)

  if (!$parsingNode[0]) {
    $body.append(`<div class="${PARSER_CLASS}" style="display: none;" />`);
    $parsingNode = $body.find(`.${PARSER_CLASS}`)
  }

  // Strip scripts
  html.find('script').remove()

  // Remove comments
  html.find('*').contents().each(function(el) {
    if(this.nodeType === Node.COMMENT_NODE) {
      $(this).remove();
    }
  });
  $parsingNode.html(html);

  if (returnHtml) return { $, html: html.html() }

  return $
}

export default $;
