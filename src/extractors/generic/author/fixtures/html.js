const HTML = {
  authorMeta: {
    test: `
      <html>
        <meta name="dc.author" value="Adam" />
      </html>
    `,
    result: 'Adam',
  },
  authorSelectors: {
    test: `
      <div>
        <div class="byline">
          <a href="/author/adam">Adam</a>
        </div>
      </div>
    `,
    result: 'Adam',
  },
  authorRegSelectors: {
    test: `
      <div>
        <div class="byline">
          <span>By Adam</span>
        </div>
      </div>
    `,
    result: 'Adam',
  },
};

export default HTML;
