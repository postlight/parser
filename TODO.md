TODO:
- remove logic for fetching meta attrs with custom props
- extractNextPageUrl
- Rename all cleaners from cleanThing to clean
- Make sure weightNodes flag is being passed properly
- Get better sense of when cheerio returns a raw node and when a cheerio object
  - Remove $ from function calls to getScore
  - Remove $ whenever possible
- Test if .is method is faster than regex methods
- Separate constants into activity-specific folders (dom, scoring)

DONE:
x cleaning embed and object nodes
x run makeLinksAbsolute on extracted content before returning
x add option to fetch attrs in RootExtractor's select method
x get custom datePublished selector to convert to date object (prob through cleaner)
x extract and generalize cleaners
  x move arguments to cleaners to object
x Check that lead-image-url extractor isn't looking for end-of-string file extension matches (i.e., it could be ...foo.jpg?otherstuff
x extractLeadImageUrl
x Resource (fetches page, validates it, cleans it, normalizes meta tags (!), converts lazy-loaded images, makes links absolute, etc)
x extractDek
x extractDatePublished
x Title metadata
x Test re-initializing $ if/when it needs to loop again
x `cleanHeaders` Remove any headers that are before any p tags, matching title, etc
x `extract` (this kicks it all off)
x `node_is_sufficient`
x `_extract_best_node`
x `get_weight`
x `_strip_unlikely_candidates`
x `_convert_to_paragraphs`
x `_brs_to_paragraphs`
x `_paragraphize`

## Scoring

x `_get_score`
x `_set_score`
x `_add_score`
x `_score_content`
x `_score_node`
x `_score_paragraph`

## Top Candidate

x `_find_top_candidate`
x `extract_clean_node`
x `_clean_conditionally`

