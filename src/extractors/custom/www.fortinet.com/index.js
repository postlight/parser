import cheerio from 'cheerio';

export const WwwFortinetComExtractor = {
  domain: 'www.fortinet.com',

  title: {
    selectors: [
      'h1',
    ],
  },

  author: {
    selectors: [
      '.b15-blog-meta__author',
    ],
  },

  date_published: {
    selectors: [
      ['meta[name="article:published_time"]', 'value'],
    ],
  },

  lead_image_url: {
    selectors: [
      ['meta[name="og:image"]', 'value'],
    ],
  },

  content: {
    selectors: [
      'div.responsivegrid.aem-GridColumn.aem-GridColumn--default--12',
    ],

    transforms: {
      noscript: ($node) => {
        const $ = cheerio.load(`<div>${$node.html()}</div>`);
        const $children = $('div').children();
        if ($children.length === 1 && $children.get(0).tagName === 'IMG') {
          return 'figure';
        }

        return null;
      },
    },
  },
};
