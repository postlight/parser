const idkRe = new RegExp('^(p|pre)$', 'i');

export default function scoreLength(textLength, tagName = 'p') {
  const chunks = textLength / 50;

  if (chunks > 0) {
    let lengthBonus;

    // No idea why p or pre are being tamped down here
    // but just following the source for now
    // Not even sure why tagName is included here,
    // since this is only being called from the context
    // of scoreParagraph
    if (idkRe.test(tagName)) {
      lengthBonus = chunks - 2;
    } else {
      lengthBonus = chunks - 1.25;
    }

    return Math.min(Math.max(lengthBonus, 0), 3);
  }

  return 0;
}
