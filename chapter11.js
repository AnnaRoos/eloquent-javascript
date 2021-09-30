//Tracking the scalpel
const {
  anyStorage,
  findInStorage,
  network,
} = require('./filesFromBook/11_async.js');

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

module.exports = { locateScalpel, locateScalpel2 };
