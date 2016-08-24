Next: Continue working on paragraphize; move p tags outside other p tags (do this when not converting br)

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
- `_score_content`
x `_score_node`
x `_score_paragraph`

## Top Candidate

- `_find_top_candidate`
- `extract_clean_node`
- `_clean_conditionally`


Add helper methods to clean up tests
