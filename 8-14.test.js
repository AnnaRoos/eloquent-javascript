const { PGroup } = require('./chapter7.js');
const { reliableMultiply } = require('./chapter8.js');

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
