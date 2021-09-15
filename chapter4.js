//The sum of a range

//My solution

const range = (start, end) => {
  let length = end - start + 1;
  let operator = 1;
  if (start > end) {
    length = start - end + 1;
    operator = -1;
  }

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

//Reversing an array (without Array.reverse)

//Return new array
const reverseArray = (array) => {
  let reversed = [];
  for (let i = array.length-1; i >= 0; i--) {
    reversed.push(array[i]);
  }
  return reversed;
};

//Modify existing array
let arrayValue = [1, 2, 3, 4, 5];
const reverseArrayInPlace = (array, start = 0, end = array.length -1) => {
  if (start >= end) return array;
  let saved = array[start];
  array[start] = array[end];
  array[end] = saved;
  return reverseArrayInPlace(array, start + 1, end - 1);
};

reverseArrayInPlace(arrayValue);


//Solution in book
/* function reverseArray(array) {
  let output = [];
  for (let i = array.length - 1; i >= 0; i--) {
    output.push(array[i]);
  }
  return output;
}

function reverseArrayInPlace(array) {
  for (let i = 0; i < Math.floor(array.length / 2); i++) {
    let old = array[i];
    array[i] = array[array.length - 1 - i];
    array[array.length - 1 - i] = old;
  }
  return array;
} */

module.exports = { range, sum, reverseArray, arrayValue };
