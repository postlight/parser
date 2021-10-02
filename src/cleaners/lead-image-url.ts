import validUrl from 'valid-url';

export function cleanImage(leadImageUrl: string) {
  leadImageUrl = leadImageUrl.trim();

  return validUrl.isWebUri(leadImageUrl) ? leadImageUrl : undefined;
}
