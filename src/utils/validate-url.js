// extremely simple url validation as a first step
export default function validateUrl({ hostname }) {
  // If this isn't a valid url, return an error message
  return !!hostname;
}
