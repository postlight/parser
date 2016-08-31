import assert from 'assert'
import cheerio from 'cheerio'
import HTML from '../fixtures/html'

export function clean(string) {
  return string.trim().replace(/\r?\n|\r/g, '').replace(/\s+/g, ' ')
}

export function assertBeforeAndAfter(key, fn) {
  const $ = cheerio.load(HTML[key].before)
  assert.equal(clean(fn($).html()), clean(HTML[key].after))
}

export function assertClean(a, b) {
  assert.equal(clean(a), clean(b))
}

