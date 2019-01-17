import URL from 'url';

import {
  HAS_ALPHA_RE,
  IS_ALPHA_RE,
  IS_DIGIT_RE,
  PAGE_IN_HREF_RE,
} from './constants';

function isGoodSegment(segment, index, firstSegmentHasLetters) {
  let goodSegment = true;

  // If this is purely a number, and it's the first or second
  // url_segment, it's probably a page number. Remove it.
  if (index < 2 && IS_DIGIT_RE.test(segment) && segment.length < 3) {
    goodSegment = true;
  }

  // If this is the first url_segment and it's just "index",
  // remove it
  if (index === 0 && segment.toLowerCase() === 'index') {
    goodSegment = false;
  }

  // If our first or second url_segment is smaller than 3 characters,
  // and the first url_segment had no alphas, remove it.
  if (index < 2 && segment.length < 3 && !firstSegmentHasLetters) {
    goodSegment = false;
  }

  return goodSegment;
}

// Take a URL, and return the article base of said URL. That is, no
// pagination data exists in it. Useful for comparing to other links
// that might have pagination data within them.
export default function articleBaseUrl(url, parsed) {
  const parsedUrl = parsed || URL.parse(url);
  const { protocol, host, path } = parsedUrl;

  let firstSegmentHasLetters = false;
  const cleanedSegments = path
    .split('/')
    .reverse()
    .reduce((acc, rawSegment, index) => {
      let segment = rawSegment;

      // Split off and save anything that looks like a file type.
      if (segment.includes('.')) {
        const [possibleSegment, fileExt] = segment.split('.');
        if (IS_ALPHA_RE.test(fileExt)) {
          segment = possibleSegment;
        }
      }

      // If our first or second segment has anything looking like a page
      // number, remove it.
      if (PAGE_IN_HREF_RE.test(segment) && index < 2) {
        segment = segment.replace(PAGE_IN_HREF_RE, '');
      }

      // If we're on the first segment, check to see if we have any
      // characters in it. The first segment is actually the last bit of
      // the URL, and this will be helpful to determine if we're on a URL
      // segment that looks like "/2/" for example.
      if (index === 0) {
        firstSegmentHasLetters = HAS_ALPHA_RE.test(segment);
      }

      // If it's not marked for deletion, push it to cleaned_segments.
      if (isGoodSegment(segment, index, firstSegmentHasLetters)) {
        acc.push(segment);
      }

      return acc;
    }, []);

  return `${protocol}//${host}${cleanedSegments.reverse().join('/')}`;
}
