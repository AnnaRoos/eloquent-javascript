//Chapter 2
//Looping a triangle
const { triangle, fizzBuzz, chess } = require('./chapter2.js');
const { min, isEven } = require('./chapter3.js');

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
  });
});