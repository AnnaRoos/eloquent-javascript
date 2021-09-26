const { PGroup } = require('./chapter7.js');
const { reliableMultiply, withBoxUnlocked, box } = require('./chapter8.js');

//Persistent Groups

describe('Persistent Groups', () => {
  test(
    'Should create a class that works as a Set and creates a' +
      'new Set for every addition or deletion',
    () => {
      let a = PGroup.empty.add('a');
      let ab = a.add('b');
      let b = ab.delete('a');
      expect(b.has('b')).toBe(true);
      expect(a.has('b')).toBe(false);
      expect(b.has('a')).toBe(false);
    }
  );
});

//Retry

describe('Retry', () => {
  test('Create a function that handles exceptions and keeps retrying until a call succeeds', () => {
    expect(reliableMultiply(8, 8)).toEqual(64);
  });
});

//The locked box

describe('The locked box', () => {
  test('Should unlock the box, run the function, and then ensures that the box is' +
    'locked again before returning', () => {
    withBoxUnlocked(function () {
      box.content.push('gold piece');
    });

    try {
      withBoxUnlocked(function () {
        throw new Error('Pirates on the horizon! Abort!');
      });
    } catch (e) {
      console.log('Error raised: ' + e);
    }
    expect(box.locked).toEqual(true);
  });
});
