export const ObamawhitehouseArchivesGovExtractor = {
  domain: 'obamawhitehouse.archives.gov',

  supportedDomains: ['whitehouse.gov'],

  title: {
    selectors: ['h1', '.pane-node-title'],
  },

  author: {
    selectors: ['.blog-author-link', '.node-person-name-link'],
  },

  date_published: {
    selectors: [['meta[name="article:published_time"]', 'value']],
  },

  dek: {
    selectors: ['.field-name-field-forall-summary'],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    defaultCleaner: false,

    selectors: ['div#content-start', '.pane-node-field-forall-body'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: ['.pane-node-title', '.pane-custom.pane-1'],
  },
};
