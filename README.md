# Mercury Parser - Extracting content from chaos

[![CircleCI](https://circleci.com/gh/postlight/mercury-parser.svg?style=svg&circle-token=3026c2b527d3767750e767872d08991aeb4f8f10)](https://circleci.com/gh/postlight/mercury-parser) [![Build status](https://ci.appveyor.com/api/projects/status/bxwqp6mn8ijycqh4?svg=true)](https://ci.appveyor.com/project/adampash/mercury-parser) [![Apache License][license-apach-badge]][license-apach] [![MITC License][license-mit-badge]][license-mit]

[license-apach-badge]: https://img.shields.io/badge/License-Apache%202.0-blue.svg?style=flat-square
[license-apach]: https://github.com/postlight/mercury-parser/blob/master/LICENSE-APACHE
[license-mit-badge]: https://img.shields.io/badge/License-MIT%202.0-blue.svg?style=flat-square
[license-mit]: https://github.com/postlight/mercury-parser/blob/master/LICENSE-MIT

The Mercury Parser extracts the bits that humans care about from any URL you give it. That includes article content, titles, authors, published dates, excerpts, lead images, and more.

Mercury Parser powers the [Mercury AMP Converter](https://mercury.postlight.com/amp-converter/) and [Mercury Reader](https://mercury.postlight.com/reader/), a Chrome extension that removes ads and distractions, leaving only text and images for a beautiful reading view on any site.

## How? Like this.

### Installation

```bash
yarn add @postlight/mercury-parser
```

### Usage

```javascript
import Mercury from '@postlight/mercury-parser';

Mercury.parse(url).then(result => console.log(result););

// NOTE: When used in the browser, you can omit the URL argument
// and simply run `Mercury.parse()` to parse the current page.

```

The result looks like this:

```json
{
  "title": "Thunder (mascot)",
  "content": "<div><div><p>This is the content of the page!</div></div>",
  "author": "Wikipedia Contributors",
  "date_published": "2016-09-16T20:56:00.000Z",
  "lead_image_url": null,
  "dek": null,
  "next_page_url": null,
  "url": "https://en.wikipedia.org/wiki/Thunder_(mascot)",
  "domain": "en.wikipedia.org",
  "excerpt": "Thunder Thunder is the stage name for the horse who is the official live animal mascot for the Denver Broncos",
  "word_count": 4677,
  "direction": "ltr",
  "total_pages": 1,
  "rendered_pages": 1
}
```

If Mercury is unable to find a field, that field will return `null`.

## License

Licensed under either of the below, at your preference:

- Apache License, Version 2.0
  ([LICENSE-APACHE](LICENSE-APACHE) or http://www.apache.org/licenses/LICENSE-2.0)
- MIT license
  ([LICENSE-MIT](LICENSE-MIT) or http://opensource.org/licenses/MIT)

## Contributing

For details on how to contribute to Mercury, including how to write a custom content extractor for any site, see [CONTRIBUTING.md](https://github.com/postlight/mercury-parser/blob/master/CONTRIBUTING.md)

Unless it is explicitly stated otherwise, any contribution intentionally submitted for inclusion in the work, as defined in the Apache-2.0 license, shall be dual licensed as above without any additional terms or conditions.
