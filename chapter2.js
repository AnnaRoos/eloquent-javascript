//Chapter 2

//Looping a triangle
//My solution
//Made a function instead to practice Jest at the same time
const triangle = (length) => {
  let triangle = '';
  for (let i = 1; i < length +1; i++) {
    for (let j = 0; j < i; j++) {
      triangle += '#';
    }
    triangle += '\n';
  }
  return triangle;
};

//Solution in book
for (let line = '#'; line.length < 8; line += '#') /* console.log(line) */;


//FizzBuzz
//My solution
const fizzBuzz = (number) => {
  return Array.from({ length: number }, (el, i) => {
    return i + 1;
  }).map((el) => {
    if (el % 15 === 0) return 'FizzBuzz';
    if (el % 3 === 0) return 'Fizz';
    if (el % 5 === 0) return 'Buzz';
    return el;
  });
};

//Solution in book
for (let n = 1; n <= 100; n++) {
  let output = '';
  if (n % 3 == 0) output += 'Fizz';
  if (n % 5 == 0) output += 'Buzz';
/*   console.log(output || n); */
}

//Chessboard
//My solution
const chess = (size) => {
  let chessboard = '';
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if ((i % 2 === 0 && j % 2 === 0) || (!(i % 2 === 0) && !(j % 2 === 0))) {
        chessboard += ' ';
      } else {
        chessboard += '#';
      }
    }
    chessboard += '\n';
  }
  return chessboard;
};


//Solution in book
let size = 8;

let board = '';

for (let y = 0; y < size; y++) {
  for (let x = 0; x < size; x++) {
    if ((x + y) % 2 == 0) {
      board += ' ';
    } else {
      board += '#';
    }
  }
  board += '\n';
}

/* console.log(board); */

module.exports = { triangle, fizzBuzz, chess };
