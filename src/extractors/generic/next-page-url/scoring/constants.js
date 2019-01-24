export const DIGIT_RE = /\d/;

// A list of words that, if found in link text or URLs, likely mean that
// this link is not a next page link.
export const EXTRANEOUS_LINK_HINTS = [
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
  'entry-unrelated',
];
export const EXTRANEOUS_LINK_HINTS_RE = new RegExp(
  EXTRANEOUS_LINK_HINTS.join('|'),
  'i'
);

// Match any link text/classname/id that looks like it could mean the next
// page. Things like: next, continue, >, >>, » but not >|, »| as those can
// mean last page.
export const NEXT_LINK_TEXT_RE = new RegExp(
  '(next|weiter|continue|>([^|]|$)|»([^|]|$))',
  'i'
);

// Match any link text/classname/id that looks like it is an end link: things
// like "first", "last", "end", etc.
export const CAP_LINK_TEXT_RE = new RegExp('(first|last|end)', 'i');

// Match any link text/classname/id that looks like it means the previous
// page.
export const PREV_LINK_TEXT_RE = new RegExp('(prev|earl|old|new|<|«)', 'i');

// Match any phrase that looks like it could be page, or paging, or pagination
export const PAGE_RE = new RegExp('pag(e|ing|inat)', 'i');
