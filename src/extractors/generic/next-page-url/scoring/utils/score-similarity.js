import difflib from 'difflib';

export default function scoreSimilarity(score, articleUrl, href) {
  // Do this last and only if we have a real candidate, because it's
  // potentially expensive computationally. Compare the link to this
  // URL using difflib to get the % similarity of these URLs. On a
  // sliding scale, subtract points from this link based on
  // similarity.
  if (score > 0) {
    const similarity = new difflib.SequenceMatcher(
      null,
      articleUrl,
      href
    ).ratio();
    // Subtract .1 from diff_percent when calculating modifier,
    // which means that if it's less than 10% different, we give a
    // bonus instead. Ex:
    //  3% different = +17.5 points
    // 10% different = 0 points
    // 20% different = -25 points
    const diffPercent = 1.0 - similarity;
    const diffModifier = -(250 * (diffPercent - 0.2));
    return score + diffModifier;
  }

  return 0;
}
