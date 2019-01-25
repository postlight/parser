import URL from 'url';

import { DIGIT_RE, EXTRANEOUS_LINK_HINTS_RE } from '../constants';

export default function shouldScore(
  href,
  articleUrl,
  baseUrl,
  parsedUrl,
  linkText,
  previousUrls
) {
  // skip if we've already fetched this url
  if (previousUrls.find(url => href === url) !== undefined) {
    return false;
  }

  // If we've already parsed this URL, or the URL matches the base
  // URL, or is empty, skip it.
  if (!href || href === articleUrl || href === baseUrl) {
    return false;
  }

  const { hostname } = parsedUrl;
  const { hostname: linkHost } = URL.parse(href);

  // Domain mismatch.
  if (linkHost !== hostname) {
    return false;
  }

  // If href doesn't contain a digit after removing the base URL,
  // it's certainly not the next page.
  const fragment = href.replace(baseUrl, '');
  if (!DIGIT_RE.test(fragment)) {
    return false;
  }

  // This link has extraneous content (like "comment") in its link
  // text, so we skip it.
  if (EXTRANEOUS_LINK_HINTS_RE.test(linkText)) {
    return false;
  }

  // Next page link text is never long, skip if it is too long.
  if (linkText.length > 25) {
    return false;
  }

  return true;
}
