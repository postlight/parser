// extremely simple url validation as a first step
export function validateUrl({ hostname }: { hostname?: string }) {
  // If this isn't a valid url, return an error message
  return !!hostname;
}
