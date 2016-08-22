'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fs = _interopDefault(require('fs'));

const PHOTO_HINTS = [
    'figure',
    'photo',
    'image',
    'caption'
]
const PHOTO_HINTS_RE = new RegExp(PHOTO_HINTS.join('|'), 'i')

const POSITIVE_LEAD_IMAGE_URL_HINTS = [
    'upload',
    'wp-content',
    'large',
    'photo',
    'wp-image',
]
const POSITIVE_LEAD_IMAGE_URL_HINTS_RE = new RegExp(POSITIVE_LEAD_IMAGE_URL_HINTS.join('|'), 'i')

const NEGATIVE_LEAD_IMAGE_URL_HINTS = [
    'spacer',
    'sprite',
    'blank',
    'throbber',
    'gradient',
    'tile',
    'bg',
    'background',
    'icon',
    'social',
    'header',
    'hdr',
    'advert',
    'spinner',
    'loader',
    'loading',
    'default',
    'rating',
    'share',
    'facebook',
    'twitter',
    'theme',
    'promo',
    'ads',
    'wp-includes',
]
const NEGATIVE_LEAD_IMAGE_URL_HINTS_RE = new RegExp(NEGATIVE_LEAD_IMAGE_URL_HINTS.join('|'), 'i')

// A list of strings that denote a positive scoring for this content as being
// an article container. Checked against className and id.
//
// TODO: Perhaps have these scale based on their odds of being quality?
const POSITIVE_SCORE_HINTS = [
    'article', 
    'articlecontent',
    'instapaper_body',
    'blog',
    'body',
    'content',
    'entry-content-asset',
    'entry',
    'hentry',
    'main',
    'Normal',
    'page',
    'pagination',
    'permalink',
    'post',
    'story',
    'text',
    '[-_]copy', //usatoday
    '\Bcopy'
]

// The above list, joined into a matching regular expression
const POSITIVE_SCORE_RE = new RegExp(POSITIVE_SCORE_HINTS.join('|'), 'i')


// A list of strings that denote a negative scoring for this content as being
// an article container. Checked against className and id.
//
// TODO: Perhaps have these scale based on their odds of being quality?
const NEGATIVE_SCORE_HINTS = [
    'adbox',
    'advert',
    'author',
    'bio',
    'bookmark',
    'bottom',
    'byline',
    'clear',
    'com-',
    'combx',
    'comment',
    'comment\B',
    'contact',
    'copy',
    'credit',
    'crumb',
    'date',
    'deck',
    'excerpt',
    'featured', //tnr.com has a featured_content which throws us off
    'foot',
    'footer',
    'footnote',
    'graf',
    'head',
    'info',
    'infotext', //newscientist.com copyright
    'instapaper_ignore',
    'jump',
    'linebreak',
    'link',
    'masthead',
    'media',
    'meta',
    'modal',
    'outbrain', //slate.com junk
    'promo',
    'pr_', // autoblog - press release
    'related',
    'respond',
    'roundcontent', //lifehacker restricted content warning
    'scroll',
    'secondary',
    'share',
    'shopping',
    'shoutbox',
    'side',
    'sidebar',
    'sponsor',
    'stamp',
    'sub',
    'summary',
    'tags',
    'tools',
    'widget'
]
// The above list, joined into a matching regular expression
const NEGATIVE_SCORE_RE = new RegExp(NEGATIVE_SCORE_HINTS.join('|'), 'i')

// A list of words that, if found in link text or URLs, likely mean that
// this link is not a next page link.
const EXTRANEOUS_LINK_HINTS = [
    'print',
    'archive',
    'comment',
    'discuss',
    'e-mail',
    'email',
    'share',
    'reply',
    'all',
    'login',
    'sign',
    'single',
    'adx',
    'entry-unrelated'
]
const EXTRANEOUS_LINK_HINTS_RE = new RegExp(EXTRANEOUS_LINK_HINTS.join('|'), 'i')

const GenericContentExtractor = {
  parse: (html) => {
    return html
  }
}

const GenericExtractor = {
  parse: (html) => {
    return {
      content: GenericContentExtractor.parse(html)
    }
  }
}

const html = fs.readFileSync('../fixtures/wired.html', 'utf-8')
const result = GenericExtractor.parse(html)
console.log(result)