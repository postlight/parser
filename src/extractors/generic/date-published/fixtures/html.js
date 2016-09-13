const HTML = {
  datePublishedMeta: {
    test: `
      <html>
        <head>
          <meta name="displaydate" value="1/1/2020 8:30 (EST)" />
        </head>
      </html>
    `,
    result: new Date('1/1/2020 8:30 (EST)'),
  },
  datePublishedSelectors: {
    test: `
      <div>
        <div class="hentry">
          <div class="updated">
            1/1/2020 <span class="time">8:30am</span>
          </div>
        </head>
      </div>
    `,
    result: new Date('1/1/2020 8:30 am (EST)'),
  },
};

export default HTML;
