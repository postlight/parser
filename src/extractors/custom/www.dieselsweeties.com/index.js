export const WwwDieselsweetiesComExtractor = {
  domain: 'www.dieselsweeties.com',

  title: {
    locator: $ => {
      return $('p.bigfollowblue')
        .first()
        .text();
    },
  },

  author: {
    selectors: [['meta[name="twitter:creator"]', 'value']],
  },

  lead_image_url: {
    selectors: [['meta[name="twitter:image"]', 'value']],
  },

  content: {
    defaultCleaner: false,
    selectors: ['#desktopcomic'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: ['#wrapmore', '#followtext', 'br'],
  },
};
