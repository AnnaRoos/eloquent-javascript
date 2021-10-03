//Comments

//My solution
//(Did not look at the hints... that might have helped :)
function skipSpace(string) {
  let withoutComments = string.replace(/#.*\n/g, '');
  let first = withoutComments.search(/\S/);
  if (first == -1) return '';
  return withoutComments.slice(first);
}

//Solution in book
//function skipSpace(string) {
// let skippable = string.match(/^(\s|#.*)*/);
// return string.slice(skippable[0].length);
//}



module.exports = { skipSpace };