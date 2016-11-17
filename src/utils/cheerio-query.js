import jQuery from 'jquery';

const PARSER_CLASS = 'mercury-parsing-container';

jQuery.noConflict();
const $ = (selector, context, rootjQuery, contextOverride = true) => {
  if (contextOverride) {
    if (context && typeof context === 'string') {
      context = `.${PARSER_CLASS} ${context}`;
    } else if (!context) {
      context = `.${PARSER_CLASS}`;
    }
  }

  return new jQuery.fn.init(selector, context, rootjQuery); // eslint-disable-line new-cap
};

$.fn = $.prototype = jQuery.fn;
jQuery.extend($, jQuery); // copy's trim, extend etc to $

const removeScripts = ($node) => {
  // remove scripts and stylesheets
  $node.find('script, style, link[rel="stylesheet"]').remove();

  return $node;
};

$.cloneHtml = () => {
  const html = removeScripts($('html', null, null, false).clone());

  return html.children().wrap('<div />').wrap('<div />');
};

$.root = () => $('*').first();

$.browser = true;

const isContainer = ($node) => {
  const el = $node.get(0);
  if (el && el.tagName) {
    return el.tagName.toLowerCase() === 'container';
  }

  return false;
};

$.html = ($node) => {
  if ($node) {
    // we never want to return a parsing container, only its children
    if (isContainer($node) || isContainer($node.children('container'))) {
      return $node.children('container').html() || $node.html();
    }

    return $('<div>').append($node.eq(0).clone()).html();
  }

  const $body = removeScripts($('body', null, null, false).clone());
  const $head = removeScripts($('head', null, null, false).clone());
  const $parsingNode = $body.find(`.${PARSER_CLASS}`);

  if ($parsingNode.length > 0) {
    return $parsingNode.children().html();
  }

  const html = $('<container />')
    .append($(`<container>${$head.html()}</container>`))
    .append($(`<container>${$body.html()}</container>`))
    .wrap('<container />')
    .parent()
    .html();

  return html;
};

$.cleanup = () => {
  $(`.${PARSER_CLASS}`, null, null, false).remove();
};

$.load = (html, opts = {}, returnHtml = false) => {
  const { normalizeWhitespace } = opts;

  if (!html) {
    html = $.cloneHtml();
  } else {
    if (normalizeWhitespace) {
      if (typeof html === 'string') {
        html = html.replace(/[\s\n\r]+/g, ' ');
      }
    }

    html = $('<container />').html(html);
  }

  const $body = $('body', null, null, false);
  // $('script', null, null, false).remove()
  let $parsingNode = $body.find(`.${PARSER_CLASS}`);

  if (!$parsingNode[0]) {
    $body.append(`<div class="${PARSER_CLASS}" style="display: none;" />`);
    $parsingNode = $body.find(`.${PARSER_CLASS}`);
  }

  // Strip scripts
  html = removeScripts(html);

  // Remove comments
  html.find('*').contents().each(function () {
    if (this.nodeType === Node.COMMENT_NODE) { // eslint-disable-line no-undef
      $(this).remove();
    }
  });
  $parsingNode.html(html);

  if (returnHtml) return { $, html: html.html() };

  return $;
};

export default $;
