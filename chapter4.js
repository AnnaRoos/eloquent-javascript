//The sum of a range

//My solution

const range = (start, end) => {
  let length = end - start + 1;
  let operator = 1;
  if (start > end) {
    length = start - end + 1;
    operator = -1;
  }

  return new Array(length)
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
  for (let i = array.length - 1; i >= 0; i--) {
    reversed.push(array[i]);
  }
  return reversed;
};

//Modify existing array
let arrayValue = [1, 2, 3, 4, 5];
const reverseArrayInPlace = (array, start = 0, end = array.length - 1) => {
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

//A list

const arrayToList = (array, list = null) => {
  if (array.length === 0) return list;
  list = prepend(array[array.length - 1], list);
  return arrayToList(array.slice(0, array.length - 1), list);
};

const listToArray = (list, array = []) => {
  if (!list) return array;
  array.push(list.value);
  return listToArray(list.rest, array);
};

const prepend = (number, list = null) => {
  let node = { value: null, rest: null };
  node.value = number;
  if (!list) {
    list = node;
  } else {
    node.rest = list;
    list = node;
  }
  return list;
};

const nth = (list, number) => {
  if (!list) return undefined;
  if (number === 0) return list.value;
  return nth(list.rest, number - 1);
};

//Solution in book
/* function arrayToList(array) {
  let list = null;
  for (let i = array.length - 1; i >= 0; i--) {
    list = { value: array[i], rest: list };
  }
  return list;
}

function listToArray(list) {
  let array = [];
  for (let node = list; node; node = node.rest) {
    array.push(node.value);
  }
  return array;
}

function prepend(value, list) {
  return { value, rest: list };
}

function nth(list, n) {
  if (!list) return undefined;
  else if (n == 0) return list.value;
  else return nth(list.rest, n - 1);
} */

//Deep comaparison

//My solution, not the prettiest ever...

let obj = { here: { is: 'an' }, object: 2 };
const deepEqual = (obj1, obj2) => {
  for (const key in obj1) {
    if (!obj2.hasOwnProperty(key)) {
      return false;
    }
  }
  for (const key in obj2) {
    if (!obj1.hasOwnProperty(key)) {
      return false;
    }
  }
  for (const key1 in obj1) {
    for (const key2 in obj2) {
      if (
        key1 === key2 &&
        obj1[key1].constructor === Object &&
        obj2[key2].constructor === Object
      ) {
        return deepEqual({ ...obj1[key1] }, { ...obj2[key2] });
      } else if (key1 === key2 && obj1[key1] !== obj2[key2]) {
        return false;
      }
    }
  }
  return true;
};

//Solution in book
/* function deepEqual(a, b) {
  if (a === b) return true;

  if (a == null || typeof a != 'object' || b == null || typeof b != 'object')
    return false;

  let keysA = Object.keys(a),
    keysB = Object.keys(b);

  if (keysA.length != keysB.length) return false;

  for (let key of keysA) {
    if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;
  }

  return true;
} */

module.exports = {
  range,
  sum,
  reverseArray,
  arrayValue,
  arrayToList,
  listToArray,
  prepend,
  nth,
  deepEqual,
};
