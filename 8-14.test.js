const { PGroup } = require('./chapter7.js');
const { reliableMultiply, withBoxUnlocked, box } = require('./chapter8.js');
const { verify } = require('./chapter9.js');

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
  test(
    'Should unlock the box, run the function, and then ensures that the box is' +
      'locked again before returning',
    () => {
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
    }
  );
});

//Regexp golf
//My solutions
describe('Regexp golf', () => {
  test(
    'Fill in the regexes to test if a string contains one of the substrings described in the comments,' +
      'make it as short as possible',
    () => {
      expect(
        verify(/ca(r|t)/, ['my car', 'bad cats'], ['camper', 'high art'])
      ).toEqual(['my car', 'bad cats']); //car, cat
      expect(
        verify(/pr?op/, ['pop culture', 'mad props'], ['plop', 'prrrop'])
      ).toEqual(['pop culture', 'mad props']); //pop, prop
      expect(
        verify(
          /ferr(et|y|ari)/,
          ['ferret', 'ferry', 'ferrari'],
          ['ferrum', 'transfer A']
        )
      ).toEqual(['ferret', 'ferry', 'ferrari']); //ferret, ferry, ferrari
      expect(
        verify(
          /ious\b/,
          ['how delicious', 'spacious room'],
          ['ruinous', 'consciousness']
        )
      ).toEqual(['how delicious', 'spacious room']); //Any word ending in ious
      expect(
        verify(/\s[.,:;]/, ['bad punctuation .'], ['escape the period'])
      ).toEqual(['bad punctuation .']); //A whitespace character followed by a period, comma, colon, or semicolon
      expect(
        verify(
          /\w{7}/,
          ['Siebentausenddreihundertzweiundzwanzig'],
          ['no', 'three small words']
        )
      ).toEqual(['Siebentausenddreihundertzweiundzwanzig']); //A word longer than six letters
      expect(
        verify(
          /\b[^\se]+\b/i,
          ['red platypus', 'wobbling nest'],
          ['earth bed', 'learning ape', 'BEET']
        )
      ).toEqual(['red platypus', 'wobbling nest']); //A word without the letter e (or E)
    }
  );
});


//Solution in book
/ca[rt]/;
/pr?op/;
/ferr(et|y|ari)/;
/ious\b/;
/\s[.,:;]/;
/\w{7}/;
/\b[^\We]+\b/i;
