# Mercury Parser - Extracting content from chaos

[![CircleCI](https://circleci.com/gh/postlight/mercury-parser.svg?style=svg&circle-token=3026c2b527d3767750e767872d08991aeb4f8f10)](https://circleci.com/gh/postlight/mercury-parser) [![Build status](https://ci.appveyor.com/api/projects/status/bxwqp6mn8ijycqh4?svg=true)](https://ci.appveyor.com/project/adampash/mercury-parser)

The Mercury Parser extracts the bits that humans care about from any URL you give it. That includes article content, titles, authors, published dates, excerpts, lead images, and more.

The Mercury Parser module powers the [Mercury Parser API](https://mercury.postlight.com/web-parser/), a free API from [Postlight](https://www.postlight.com/) that puts all of this information one API request away..

## How? Like this.

### Installation

```bash
yarn add mercury-parser
```

### Usage

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

[![All Contributors](https://img.shields.io/badge/all_contributors-11-orange.svg?style=flat-square)](#contributors)

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars.githubusercontent.com/u/64131?v=3" width="100px;" alt="Adam Pash"/><br /><sub><b>Adam Pash</b></sub>](http://adampash.com)<br />[📝](#blog-adampash "Blogposts") [💻](https://github.com/postlight/readability-parser/commits?author=adampash "Code") [📖](https://github.com/postlight/readability-parser/commits?author=adampash "Documentation") [💡](#example-adampash "Examples") | [<img src="https://avatars.githubusercontent.com/u/19412836?v=3" width="100px;" alt="Toy Vano"/><br /><sub><b>Toy Vano</b></sub>](https://github.com/spiffytoy)<br />[💻](https://github.com/postlight/readability-parser/commits?author=spiffytoy "Code") | [<img src="https://avatars.githubusercontent.com/u/183608?v=3" width="100px;" alt="Drew Bell"/><br /><sub><b>Drew Bell</b></sub>](droob.org)<br />[💻](https://github.com/postlight/readability-parser/commits?author=droob "Code") | [<img src="https://avatars.githubusercontent.com/u/305901?v=3" width="100px;" alt="Jeremy Mack"/><br /><sub><b>Jeremy Mack</b></sub>](https://twitter.com/mutewinter)<br />[💻](https://github.com/postlight/readability-parser/commits?author=mutewinter "Code") | [<img src="https://avatars0.githubusercontent.com/u/2188008?v=4" width="100px;" alt="Alexi Akl"/><br /><sub><b>Alexi Akl</b></sub>](https://github.com/alexiakl)<br />[💻](https://github.com/postlight/readability-parser/commits?author=alexiakl "Code") | [<img src="https://avatars2.githubusercontent.com/u/3069650?v=4" width="100px;" alt="George Haddad"/><br /><sub><b>George Haddad</b></sub>](https://github.com/george-haddad)<br />[💻](https://github.com/postlight/readability-parser/commits?author=george-haddad "Code") [📖](https://github.com/postlight/readability-parser/commits?author=george-haddad "Documentation") | [<img src="https://avatars3.githubusercontent.com/u/13136721?v=4" width="100px;" alt="Toufic Mouallem"/><br /><sub><b>Toufic Mouallem</b></sub>](https://github.com/toufic-m)<br />[💻](https://github.com/postlight/readability-parser/commits?author=toufic-m "Code") [📖](https://github.com/postlight/readability-parser/commits?author=toufic-m "Documentation") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars2.githubusercontent.com/u/23698181?v=4" width="100px;" alt="Wajeeh Zantout"/><br /><sub><b>Wajeeh Zantout</b></sub>](https://github.com/WajeehZantout)<br />[💻](https://github.com/postlight/readability-parser/commits?author=WajeehZantout "Code") [📖](https://github.com/postlight/readability-parser/commits?author=WajeehZantout "Documentation") | [<img src="https://avatars1.githubusercontent.com/u/31523264?v=4" width="100px;" alt="Marc Esso"/><br /><sub><b>Marc Esso</b></sub>](https://github.com/e55o)<br />[💻](https://github.com/postlight/readability-parser/commits?author=e55o "Code") [📖](https://github.com/postlight/readability-parser/commits?author=e55o "Documentation") | [<img src="https://avatars0.githubusercontent.com/u/32297675?v=4" width="100px;" alt="Jad Termsani"/><br /><sub><b>Jad Termsani</b></sub>](https://github.com/JadTermsani)<br />[💻](https://github.com/postlight/readability-parser/commits?author=JadTermsani "Code") [📖](https://github.com/postlight/readability-parser/commits?author=JadTermsani "Documentation") | [<img src="https://avatars2.githubusercontent.com/u/31958255?v=4" width="100px;" alt="Ralph Jbeily"/><br /><sub><b>Ralph Jbeily</b></sub>](https://github.com/RalphJbeily)<br />[💻](https://github.com/postlight/readability-parser/commits?author=RalphJbeily "Code") [📖](https://github.com/postlight/readability-parser/commits?author=RalphJbeily "Documentation") |

<!-- ALL-CONTRIBUTORS-LIST:END -->
