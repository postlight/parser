// Given a node type to search for, and a list of regular expressions,
// look to see if this extraction can be found in the URL. Expects
// that each expression in r_list will return group(1) as the proper
// string to be cleaned.
// Only used for date_published currently.
export default function extractFromUrl(url, regexList) {
  const matchRe = regexList.find(re => re.test(url));
  if (matchRe) {
    return matchRe.exec(url)[1];
  }

  return null;
}
