//Chapter 2
//Looping a triangle
const { triangle, fizzBuzz, chess } = require('./chapter2.js');
const { min, isEven, countChar } = require('./chapter3.js');
const { range, sum, reverseArray, arrayValue } = require('./chapter4.js');

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
    expect(chess(8)).toEqual(' # # # #\n# # # # \n # # # #\n# # # # \n # # # #\n# # # # \n # # # #\n# # # # \n');
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
    expect(range(1, 10)).toEqual([1,2,3,4,5,6,7,8,9,10]);
    expect(range(5, 2, -1)).toEqual([5, 4, 3, 2]);
    expect(sum(range(1,10))).toEqual(55);
  });
});

//Reversing an array

describe('Reversing an array', () => {
  test('Reverse array and return a new, and reverse existing array', () => {
    expect(reverseArray(['A', 'B', 'C'])).toEqual(['C', 'B', 'A']);
    expect(arrayValue).toEqual([5, 4, 3, 2, 1]);
  });
});