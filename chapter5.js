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

module.exports = { flat, loop };
