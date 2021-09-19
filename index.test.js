//Chapter 2
//Looping a triangle
const { triangle, fizzBuzz, chess } = require('./chapter2.js');
const { min, isEven, countChar } = require('./chapter3.js');
const {
  range,
  sum,
  reverseArray,
  arrayValue,
  arrayToList,
  listToArray,
  prepend,
  nth,
  deepEqual,
} = require('./chapter4.js');
const { flat, loop, every1, every2 } = require('./chapter5.js');

describe('Looping a triangle', () => {
  test('Should output a triangle', () => {
    expect(triangle(7)).toEqual('#\n##\n###\n####\n#####\n######\n#######\n');
  });
});

//FizzBuzz

describe('Fizz Buzz', () => {
  const output = fizzBuzz(100);
  test('Should output number', () => {
    expect(output[0]).toEqual(1);
  });
  test('Should output Fizz', () => {
    expect(output[2]).toEqual('Fizz');
  });
  test('Should output Buzz', () => {
    expect(output[4]).toEqual('Buzz');
  });
  test('Should output FizzBuzz', () => {
    expect(output[14]).toEqual('FizzBuzz');
  });
});

//Chessboard

describe('Chessboard', () => {
  test('Should create chessboard', () => {
    expect(chess(8)).toEqual(
      ' # # # #\n# # # # \n # # # #\n# # # # \n # # # #\n# # # # \n # # # #\n# # # # \n'
    );
  });
});

//Minumum

describe('Minimum', () => {
  test('Should return the smallest number', () => {
    expect(min(0, 10)).toEqual(0);
    expect(min(0, -10)).toEqual(-10);
  });
});

//Recursion

describe('Recursion', () => {
  test('Should return if number is even or not', () => {
    expect(isEven(50)).toBe(true);
    expect(isEven(75)).toBe(false);
    expect(isEven(-1)).toBe(false);
    expect(isEven(-10)).toBe(true);
  });
});

//Bean counting

describe('Bean counting', () => {
  test('Should return the number of a specific character in a string', () => {
    expect(countChar('BBC', 'B')).toEqual(2);
    expect(countChar('kakkerlak', 'k')).toEqual(4);
  });
});

//The sum of a range

describe('The sum of a range', () => {
  test('Range should create an array of numbers between to given numbers and sum should add them together', () => {
    expect(range(1, 10)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(range(5, 2, -1)).toEqual([5, 4, 3, 2]);
    expect(sum(range(1, 10))).toEqual(55);
  });
});

//Reversing an array

describe('Reversing an array', () => {
  test('Reverse array and return a new, and reverse existing array', () => {
    expect(reverseArray(['A', 'B', 'C'])).toEqual(['C', 'B', 'A']);
    expect(arrayValue).toEqual([5, 4, 3, 2, 1]);
  });
});

//A list

describe('A list', () => {
  test('Convert an array to a list, and the other way around', () => {
    expect(arrayToList([10, 20])).toEqual({
      value: 10,
      rest: { value: 20, rest: null },
    });
    expect(listToArray(arrayToList([10, 20, 30]))).toEqual([10, 20, 30]);
  });
  test('Take an element and create a new list with that value at the beginning', () => {
    expect(prepend(10, prepend(20, null))).toEqual({
      value: 10,
      rest: { value: 20, rest: null },
    });
  });
  test('Return the element at the position given, starting from 0', () => {
    expect(nth(arrayToList([10, 20, 30]), 1)).toEqual(20);
    expect(nth(arrayToList([10, 20, 30]), 4)).toEqual(undefined);
  });
});

//Deep equal

//Reversing an array

describe('Deep equal', () => {
  test('Compare the properties of two objects', () => {
    let obj = { here: { is: 'an' }, object: 2 };
    expect(deepEqual(obj, obj)).toBe(true);
    expect(deepEqual(obj, { here: 1, object: 2 })).toBe(false);
    expect(deepEqual(obj, { here: { is: 'an' }, object: 2 })).toBe(true);
    expect(
      deepEqual(obj, { here: { is: 'an' }, object: 2, hello: 'there' })
    ).toBe(false);
  });
});

//Flattening

describe('Flattening', () => {
  test('Turn array of arrays in to one array', () => {
    let arrays = [[1, 2, 3], [4, 5], [6]];
    expect(flat(arrays)).toEqual([1, 2, 3, 4, 5, 6]);
  });
});

//Loop

describe('Loop', () => {
  test(
    'A higher order function that takes a value, a test function,' +
      'an update function, and a body function',
    () => {
      const consoleSpy = jest.spyOn(console, 'log');
      const number = 3;
      loop(
        number,
        (n) => n > 0,
        (n) => n - 1,
        console.log
      );

      expect(consoleSpy).toHaveBeenCalledTimes(3);
      expect(consoleSpy).toHaveBeenCalledWith(3);
      expect(consoleSpy).toHaveBeenLastCalledWith(1);
    }
  );
});

//Everything

describe('Everything', () => {
  test('Returns true if every element in the array returns true - loop version', () => {
    expect(every1([1, 2, 3], (n) => n < 10)).toBe(true);
    expect(every1([2, 4, 16], (n) => n < 10)).toBe(false);
    expect(every1([], (n) => n < 10)).toBe(true);
  });
});

describe('Everything', () => {
  test('Returns true if every element in the array returns true - some version', () => {
    expect(every2([1, 2, 3], (n) => n < 10)).toBe(true);
    expect(every2([2, 4, 16], (n) => n < 10)).toBe(false);
    expect(every2([], (n) => n < 10)).toBe(true);
  });
});