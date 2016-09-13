import { IS_DIGIT_RE } from 'utils/text/constants';

export default function scoreLinkText(linkText, pageNum) {
  // If the link text can be parsed as a number, give it a minor
  // bonus, with a slight bias towards lower numbered pages. This is
  // so that pages that might not have 'next' in their text can still
  // get scored, and sorted properly by score.
  let score = 0;

  if (IS_DIGIT_RE.test(linkText.trim())) {
    const linkTextAsNum = parseInt(linkText, 10);
    // If it's the first page, we already got it on the first call.
    // Give it a negative score. Otherwise, up to page 10, give a
    // small bonus.
    if (linkTextAsNum < 2) {
      score = -30;
    } else {
      score = Math.max(0, 10 - linkTextAsNum);
    }

    // If it appears that the current page number is greater than
    // this links page number, it's a very bad sign. Give it a big
    // penalty.
    if (pageNum && pageNum >= linkTextAsNum) {
      score -= 50;
    }
  }

  return score;
}
