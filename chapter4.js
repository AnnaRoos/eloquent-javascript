//The sum of a range

//My solution

const range = (start, end) => {
  let length = end - start + 1;
  let operator = 1;
  if (start > end) { length = start - end + 1; operator = -1; }

  return Array(length)
    .fill(start, 0, length)
    .map((el, i) => el + i * operator);
};

const sum = (array) => {
  return array.reduce((acc, curr) => acc + curr);
};

//Solution in book
/* function range(start, end, step = start < end ? 1 : -1) {
  let array = [];

  if (step > 0) {
    for (let i = start; i <= end; i += step) array.push(i);
  } else {
    for (let i = start; i >= end; i += step) array.push(i);
  }
  return array;
}

function sum(array) {
  let total = 0;
  for (let value of array) {
    total += value;
  }
  return total;
} */

module.exports = { range, sum };