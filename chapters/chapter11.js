//Tracking the scalpel
const {
  anyStorage,
  findInStorage,
  network,
} = require('../filesFromBook/11_async.js');

//My solution
const locateScalpel = async (nest) => {
  let currentNest = nest.name;
  while (true) {
    const nextNest = await anyStorage(nest, currentNest, 'scalpel');
    if (nextNest === currentNest) return currentNest;
    currentNest = nextNest;
  }
};

//Solution in book
/* async function locateScalpel(nest) {
  let current = nest.name;
  for (;;) {
    let next = await anyStorage(nest, current, 'scalpel');
    if (next == current) return current;
    current = next;
  }
}
 */

//Solution in book
function locateScalpel2(nest) {
  function loop(current) {
    return anyStorage(nest, current, 'scalpel').then((next) => {
      if (current === next) return current;
      else return loop(next);
    });
  }
  return loop(nest.name);
}

//Building Promise.all
//Solution from book
function Promise_all(promises) {
  return new Promise((resolve, reject) => {
    let results = [];
    let pending = promises.length;
    for (let i = 0; i < promises.length; i++) {
      promises[i]
        .then((result) => {
          results[i] = result;
          pending--;
          if (pending == 0) resolve(results);
        })
        .catch(reject);
    }
    if (promises.length == 0) resolve(results);
  });
}

function soon(val) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(val), Math.random() * 500);
  });
}

module.exports = { locateScalpel, locateScalpel2, Promise_all, soon };
