const HTML = {
  // extractFromMeta
  metaFoo: {
    test: `
      <html>
        <meta name="foo" value="bar" />
      </html>`,
    result: 'bar',
  },
  metaDupes: {
    test: `
      <html>
        <meta name="foo" value="bar" />
        <meta name="foo" value="baz" />
      </html>`,
    result: null,
  },
  metaEmptyDupes: {
    test: `
      <html>
        <meta name="foo" value="bar" />
        <meta name="foo" value="" />
      </html>`,
    result: 'bar',
  },
  custom: {
    test: `
      <html>
        <meta property="foo" content="bar" />
      </html>`,
    result: 'bar',
  },

  // extractFromSelectors
  simpleSelector: {
    test: `
      <html>
        <div class="author">Adam</div>
      </html>`,
    result: 'Adam',
  },
  insideComment: {
    test: `
      <html>
        <div class="comments-section">
          <div class="author">Adam</div>
        </div>
      </html>`,
    result: null,
  },
  multiMatch: {
    test: `
      <html>
        <div>
          <div class="author">Adam</div>
          <div class="author">Adam</div>
        </div>
      </html>`,
    result: null,
  },
  manyChildren: {
    test: `
      <html>
        <div>
          <div class="author">
            <span>Adam</span>
            <span>Pash</span>
          </div>
        </div>
      </html>`,
    result: null,
  },
};

export default HTML;
