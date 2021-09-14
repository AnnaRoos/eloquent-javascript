//Minimum
//My solution
const min = (number1, number2) => {
  return number1 < number2 ? number1 : number2;
};

//Solution on book
/* function min(a, b) {
  if (a < b) return a;
  else return b;
}
 */

//Recursion
//My solution
const isEven = (number) => {
  if (number < 0) number = number * Math.sign(number);
  if (number === 0) return true;
  if (number === 1) return false;
  return isEven(number - 2);
};

//Solution in book
/* function isEven(n) {
  if (n == 0) return true;
  else if (n == 1) return false;
  else if (n < 0) return isEven(-n);
  else return isEven(n - 2);
} */

//Bean counting

const countChar = (word, char) => {
  let result = 0;
  for (let i = 0; i < word.length; i++) {
    if (char === word[i]) {
      result++;
    }
  }
  return result;
};

//Solution in book
/* function countChar(string, ch) {
  let counted = 0;
  for (let i = 0; i < string.length; i++) {
    if (string[i] == ch) {
      counted += 1;
    }
  }
  return counted;
} */

module.exports = { min, isEven, countChar };