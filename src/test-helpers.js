import assert from 'assert';

export function clean(string) {
  return string.trim().replace(/\r?\n|\r/g, '').replace(/\s+/g, ' ');
}

export function assertClean(a, b) {
  assert.equal(clean(a), clean(b));
}

