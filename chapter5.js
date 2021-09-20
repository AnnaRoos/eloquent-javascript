const { SCRIPTS } = require('./scripts.js');
const { characterScript, countBy } = require('./05_higher_order.js');

//Flattening

//My solution
const flat = (arrays) => {
  return arrays.reduce((acc, curr) => acc.concat(curr));
};

//Solution in book
/* arrays.reduce((flat, current) => flat.concat(current), []); */

//Loop
const loop = (value, testFn, updateFn, bodyFn) => {
  for (value; testFn(value); value = updateFn(value)) bodyFn(value);
};

//Solution in book
/* function loop(start, test, update, body) {
  for (let value = start; test(value); value = update(value)) {
    body(value);
  }
} */

//Everything
//My solutions
const every1 = (array, test) => {
  for (const item of array) if (!test(item)) return false;
  return true;
};

const every2 = (array, test) => {
  return !array.some((el) => !test(el));
};

//Solution in book
/* function every(array, predicate) {
  for (let element of array) {
    if (!predicate(element)) return false;
  }
  return true;
}

function every2(array, predicate) {
  return !array.some((element) => !predicate(element));
} */

//Dominant writing direction
//I could just swap script.name for script.directions and treat the name property as directions, 
//but if I was to use the given functions as intended (to get the name) this is a (not the cleanest, but working) solution

const dominantDirection1 = (text) => {
  let scripts = countBy(text, (char) => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.name : 'none';
  }).filter(({ name }) => name != 'none');

  let directionCounts = Array(3).fill(0);
  let directions = ['ltr', 'rtl', 'ttb'];
  for (const item of scripts) {
    switch (SCRIPTS[SCRIPTS.findIndex((s) => s.name === item.name)].direction) {
      case 'ltr':
        directionCounts[0] += item.count;
        break;
      case 'rtl':
        directionCounts[1] += item.count;
        break;
      case 'ttb':
        directionCounts[2] += item.count;
        break;
      default:
        break;
    }
  }

  let largest = directionCounts.reduce((a, b) => (a > b ? a : b));
  return directions[directionCounts.indexOf(largest)];
};

//Solution if I can use the countBy function to sort on direction onstead of name
const dominantDirection = (text) => {
  let scripts = countBy(text, (char) => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.direction : 'none';
  }).filter(({ name }) => name != 'none');

  //Solution in book is much shorter and better 
  const largest = scripts.reduce((a, { count }) => count > a ? count : a, 0);

  return scripts[scripts.findIndex(s => s.count === largest)].name;
};

//Solution in book
/* function dominantDirection(text) {
  let counted = countBy(text, (char) => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.direction : 'none';
  }).filter(({ name }) => name != 'none');

  if (counted.length == 0) return 'ltr';

  return counted.reduce((a, b) => (a.count > b.count ? a : b)).name;
} */

module.exports = { flat, loop, every1, every2, dominantDirection };
