Next: Work on score-content, making sure it's working as intended (seems to be)

- `extract` (this kicks it all off)
x `node_is_sufficient`
- `_extract_best_node`
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
- `extract_clean_node`
- `_clean_conditionally`


Make sure weightNodes flag is being passed properly
Get better sense of when cheerio returns a raw node and when a cheerio object
  Remove $ from function calls to getScore
  Remove $ whenever possible
Test if .is method is faster than regex methods
Separate constants into activity-specific folders (dom, scoring)
