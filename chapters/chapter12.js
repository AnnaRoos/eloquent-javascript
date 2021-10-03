//Arrays
//Solution is in the test

//Comments

//Original function
/* function skipSpace(string) {
  let first = string.search(/\S/);
  if (first == -1) return '';
  return string.slice(first);
} */

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

//Fixing scope
//Solution is in filesFromBook/12_language.js

module.exports = { skipSpace };
