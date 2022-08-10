export const WwwNdtvComExtractor = {
  domain: 'www.ndtv.com',

  title: {
    selectors: [['meta[name="og:title"]', 'value'], 'h1.entry-title'],
  },

  author: {
    selectors: ['span[itemprop="author"] span[itemprop="name"]'],
  },

  date_published: {
    selectors: [['span[itemprop="dateModified"]', 'content']],
  },

  dek: {
    selectors: ['h2'],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['div[itemprop="articleBody"]'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
      // This site puts a dateline in a 'b' above the first paragraph, and then somehow
      // blends it into the first paragraph with CSS. This transform moves the dateline
      // to the first paragraph.
      '.place_cont': $node => {
        if (!$node.parents('p').length) {
          const nextSibling = $node.next('p');
          if (nextSibling) {
            $node.remove();
            nextSibling.prepend($node);
          }
        }
      },
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [
      '.highlghts_Wdgt',
      '.ins_instory_dv_caption',
      'input',
      '._world-wrapper .mt20',
    ],
  },
};
