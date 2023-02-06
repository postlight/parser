export const MBlogNaverComExtractor = {
  domain: 'm.blog.naver.com',

  title: {
    selectors: [
      '.se-title-text'
    ],
  },

  author: {
    selectors: [
      ['meta[name="naverblog:nickname"]', 'value'],
    ],
  },

  date_published: {
    selectors: [
      '.blog_date'
    ],
    format: 'YYYY. MM. DD. HH:mm',
    timezone: 'Asia/Seoul',
  },

  // m.blog.naver.com doesn't have dek.
  lead_image_url: {
    selectors: [
      ['meta[name="og:image"]', 'value'],
    ],
  },

  content: {
    selectors: [
      '.se-main-container'
    ],
  },
}
