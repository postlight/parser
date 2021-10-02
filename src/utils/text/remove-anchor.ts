export function removeAnchor(url: string) {
  return url.split('#')[0].replace(/\/$/, '');
}
