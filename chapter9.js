//Regexp golf

function verify(regexp, yes, no) {
  // Ignore unfinished exercises
  let matches = [];
  if (regexp.source == "...") return;
  for (let str of yes) if (regexp.test(str)) {
    matches.push(str);
  }
  for (let str of no) if (regexp.test(str)) {
    matches.push(str);
  }
  return matches;
}

module.exports = { verify };