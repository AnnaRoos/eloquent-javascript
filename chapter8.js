//Retry

const { every1 } = require("./chapter5");

class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.2) {
    return a * b;
  } else {
    throw new MultiplicatorUnitFailure('Klunk');
  }
}

//My solution
function reliableMultiply(a, b) {
  let result;
  try {
    result = primitiveMultiply(a, b);
  } catch (error) {
    if (error instanceof MultiplicatorUnitFailure) {
      return reliableMultiply(a, b);
    } else {
      throw error;
    }
  }
  return result;
}

//Solution in book
/* function reliableMultiply(a, b) {
  for (;;) {
    try {
      return primitiveMultiply(a, b);
    } catch (e) {
      if (!(e instanceof MultiplicatorUnitFailure)) throw e;
    }
  }
} */


module.exports = { reliableMultiply };