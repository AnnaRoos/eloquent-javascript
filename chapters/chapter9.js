//Regexp golf
//Solution in test file

//Quoting style
//Solution in test file

//Numbers again

function verify(regexp, yes, no) {
  // Ignore unfinished exercises
  let matches = [];
  let wrongMatches = [];
  if (regexp.source == '...') return;
  for (let str of yes)
    if (regexp.test(str)) {
      matches.push(str);
    }
  for (let str of no)
    if (regexp.test(str)) {
      wrongMatches.push(str);
    }
  return { 'matches': matches, 'wrongMatches': wrongMatches };
}



module.exports = { verify };
