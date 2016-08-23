export function clean(string) {
  return string.trim().replace(/\r?\n|\r/g, '').replace(/\s+/g, '')
}
