# Mercury Parser - Extracting content from chaos

The Mercury Parser extracts the bits that humans care about from any URL you give it. That includes article content, titles, authors, published dates, excerpts, lead images, and more.

The Mercury Parser module powers the [Mercury Parser API](#tk), a free API from [Postlight](https://www.postlight.com/) that puts all of this information one API request away..

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

## Contributing

If you'd like to write a custom parser for a site, [here's how](src/extractors/custom/README.md).
