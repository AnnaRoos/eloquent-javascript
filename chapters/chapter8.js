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

//The locked box

const box = {
  locked: true,
  unlock() {
    this.locked = false;
  },
  lock() {
    this.locked = true;
  },
  _content: [],
  get content() {
    if (this.locked) throw new Error('Locked!');
    return this._content;
  },
};


//My solution
function withBoxUnlocked(body) {
  let wasClosed = box.locked;
  if (wasClosed) box.unlock();
  try {
    body();
  } finally {
    if (wasClosed) box.lock();
  }
}

//Solution in book
/* function withBoxUnlocked(body) {
  let locked = box.locked;
  if (!locked) {
    return body();
  }

  box.unlock();
  try {
    return body();
  } finally {
    box.lock();
  }
} */

module.exports = { reliableMultiply, withBoxUnlocked, box };