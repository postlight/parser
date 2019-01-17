// An expression that looks to try to find the page digit within a URL, if
// it exists.
// Matches:
//  page=1
//  pg=1
//  p=1
//  paging=12
//  pag=7
//  pagination/1
//  paging/88
//  pa/83
//  p/11
//
// Does not match:
//  pg=102
//  page:2
export const PAGE_IN_HREF_RE = new RegExp(
  '(page|paging|(p(a|g|ag)?(e|enum|ewanted|ing|ination)))?(=|/)([0-9]{1,3})',
  'i'
);

export const HAS_ALPHA_RE = /[a-z]/i;

export const IS_ALPHA_RE = /^[a-z]+$/i;
export const IS_DIGIT_RE = /^[0-9]+$/i;

export const ENCODING_RE = /charset=([\w-]+)\b/;
export const DEFAULT_ENCODING = 'utf-8';
