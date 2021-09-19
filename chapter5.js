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
  return !array.some(el => !test(el));
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
module.exports = { flat, loop, every1, every2 };
