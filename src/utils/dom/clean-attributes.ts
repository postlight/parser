import { getAttrs } from './get-attrs';
import { setAttrs } from './set-attrs';

import { WHITELIST_ATTRS_RE, KEEP_CLASS } from './constants';

function removeAllButWhitelist($article: cheerio.Cheerio, $: cheerio.Root) {
  $article.find('*').each((index, node) => {
    const attrs = getAttrs(node);

    setAttrs(
      node,
      Reflect.ownKeys(attrs).reduce(
        (acc, attr) => {
          const stringAttr = String(attr);

          if (WHITELIST_ATTRS_RE.test(stringAttr)) {
            return { ...acc, [attr]: attrs[stringAttr] };
          }

          return acc;
        },
        {} as Record<string, string>
      )
    );
  });

  // Remove the mercury-parser-keep class from result
  $(`.${KEEP_CLASS}`, $article).removeClass(KEEP_CLASS);

  return $article;
}

// Remove attributes like style or align
export function cleanAttributes($article: cheerio.Cheerio, $: cheerio.Root) {
  // Grabbing the parent because at this point
  // $article will be wrapped in a div which will
  // have a score set on it.
  return removeAllButWhitelist(
    $article.parent().length ? $article.parent() : $article,
    $
  );
}
