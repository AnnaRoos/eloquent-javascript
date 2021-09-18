//Flattening

//My solution
const flat = (arrays) => {
  return arrays.reduce((acc, curr) => acc.concat(curr));
};

//Solution in book
arrays.reduce((flat, current) => flat.concat(current), []);


module.exports = { flat };