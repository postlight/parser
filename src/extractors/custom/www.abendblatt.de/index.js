/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
export const WwwAbendblattDeExtractor = {
  domain: 'www.abendblatt.de',

  title: {
    selectors: ['h2.article__header__headline'],
  },

  author: {
    selectors: ['span.author-info__name-text'],
  },

  date_published: {
    selectors: [['time.article__header__date', 'datetime']],
  },

  dek: {
    selectors: ["span[itemprop='description']"],
  },

  lead_image_url: {
    selectors: [["meta[name='og:image']", 'value']],
  },

  content: {
    selectors: ['div.article__body'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
      p: $node => {
        if (!$node.hasClass('obfuscated')) return null;
        let o = '';
        let n = 0;
        for (let i = $node.text(); n < i.length; n += 1) {
          const r = i.charCodeAt(n);
          r === 177
            ? (o += '%')
            : r === 178
            ? (o += '!')
            : r === 180
            ? (o += ';')
            : r === 181
            ? (o += '=')
            : r === 32
            ? (o += ' ')
            : r === 10
            ? (o += '\n')
            : r > 33 && (o += String.fromCharCode(r - 1));
        }

        $node.html(o);
        $node.removeClass('obfuscated');
        $node.addClass('deobfuscated');
        return null;
      },
      div: $node => {
        if (!$node.hasClass('obfuscated')) return null;
        let o = '';
        let n = 0;
        for (let i = $node.text(); n < i.length; n += 1) {
          const r = i.charCodeAt(n);
          r === 177
            ? (o += '%')
            : r === 178
            ? (o += '!')
            : r === 180
            ? (o += ';')
            : r === 181
            ? (o += '=')
            : r === 32
            ? (o += ' ')
            : r === 10
            ? (o += '\n')
            : r > 33 && (o += String.fromCharCode(r - 1));
        }

        $node.html(o);
        $node.removeClass('obfuscated');
        $node.addClass('deobfuscated');
        return null;
      },
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },
};
