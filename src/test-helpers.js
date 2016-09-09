import assert from 'assert'
import cheerio from 'cheerio'

export function clean(string) {
  return string.trim().replace(/\r?\n|\r/g, '').replace(/\s+/g, ' ')
}

export function assertClean(a, b) {
  assert.equal(clean(a), clean(b))
}

