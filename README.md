# Mercury Parser - Extracting content from chaos

[![CircleCI](https://circleci.com/gh/postlight/mercury-parser.svg?style=svg&circle-token=3026c2b527d3767750e767872d08991aeb4f8f10)](https://circleci.com/gh/postlight/mercury-parser) [![Build status](https://ci.appveyor.com/api/projects/status/bxwqp6mn8ijycqh4?svg=true)](https://ci.appveyor.com/project/adampash/mercury-parser)

The Mercury Parser extracts the bits that humans care about from any URL you give it. That includes article content, titles, authors, published dates, excerpts, lead images, and more.

The Mercury Parser module powers the [Mercury Parser API](https://mercury.postlight.com/web-parser/), a free API from [Postlight](https://www.postlight.com/) that puts all of this information one API request away..

## How? Like this.

```javascript
import Mercury from 'mercury-parser';

Mercury.parse(url).then(result => console.log(result););
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

Unless it is explicitly stated otherwise, any contribution intentionally submitted for inclusion in the work, as defined in the Apache-2.0 license, shall be dual licensed as above without any additional terms or conditions.

## Contributors

[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors)

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

| [<img src="https://avatars.githubusercontent.com/u/64131?v=3" width="100px;"/><br /><sub>Adam Pash</sub>](http://adampash.com)<br />📝 [💻](https://github.com/postlight/readability-parser/commits?author=adampash) [📖](https://github.com/postlight/readability-parser/commits?author=adampash) 💡 | [<img src="https://avatars.githubusercontent.com/u/19412836?v=3" width="100px;"/><br /><sub>Toy Vano</sub>](https://github.com/spiffytoy)<br />[💻](https://github.com/postlight/readability-parser/commits?author=spiffytoy) | [<img src="https://avatars.githubusercontent.com/u/183608?v=3" width="100px;"/><br /><sub>Drew Bell</sub>](droob.org)<br />[💻](https://github.com/postlight/readability-parser/commits?author=droob) | [<img src="https://avatars.githubusercontent.com/u/305901?v=3" width="100px;"/><br /><sub>Jeremy Mack</sub>](https://twitter.com/mutewinter)<br />[💻](https://github.com/postlight/readability-parser/commits?author=mutewinter) |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |


<!-- ALL-CONTRIBUTORS-LIST:END -->
