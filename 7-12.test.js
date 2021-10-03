const { PGroup } = require('./chapters/chapter7.js');
const {
  reliableMultiply,
  withBoxUnlocked,
  box,
} = require('./chapters/chapter8.js');
const { verify } = require('./chapters/chapter9.js');
const { locateScalpel, locateScalpel2 } = require('./chapters/chapter11.js');
const bigOak = require('./filesFromBook/crow-tech.js').bigOak;
const { Promise_all, soon } = require('./chapters/chapter11.js');
const { run, topScope, parse } = require('./filesFromBook/12_language.js');

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
      ).toEqual({ matches: ['my car', 'bad cats'], wrongMatches: [] }); //car, cat
      expect(
        verify(/pr?op/, ['pop culture', 'mad props'], ['plop', 'prrrop'])
      ).toEqual({ matches: ['pop culture', 'mad props'], wrongMatches: [] }); //pop, prop
      expect(
        verify(
          /ferr(et|y|ari)/,
          ['ferret', 'ferry', 'ferrari'],
          ['ferrum', 'transfer A']
        )
      ).toEqual({ matches: ['ferret', 'ferry', 'ferrari'], wrongMatches: [] }); //ferret, ferry, ferrari
      expect(
        verify(
          /ious\b/,
          ['how delicious', 'spacious room'],
          ['ruinous', 'consciousness']
        )
      ).toEqual({
        matches: ['how delicious', 'spacious room'],
        wrongMatches: [],
      }); //Any word ending in ious
      expect(
        verify(/\s[.,:;]/, ['bad punctuation .'], ['escape the period'])
      ).toEqual({ matches: ['bad punctuation .'], wrongMatches: [] }); //A whitespace character followed by a period, comma, colon, or semicolon
      expect(
        verify(
          /\w{7}/,
          ['Siebentausenddreihundertzweiundzwanzig'],
          ['no', 'three small words']
        )
      ).toEqual({
        matches: ['Siebentausenddreihundertzweiundzwanzig'],
        wrongMatches: [],
      }); //A word longer than six letters
      expect(
        verify(
          /\b[^\se]+\b/i,
          ['red platypus', 'wobbling nest'],
          ['earth bed', 'learning ape', 'BEET']
        )
      ).toEqual({
        matches: ['red platypus', 'wobbling nest'],
        wrongMatches: [],
      }); //A word without the letter e (or E)
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

//Quoting style

describe('Quoting style', () => {
  test('Swap single quotes for double while keeping singles in words', () => {
    let text = "'I'm the cook,' he said, 'it's my job.'";
    //My solution
    expect(text.replace(/(\W)(')|^'/g, '$1"')).toEqual(
      `"I'm the cook," he said, "it's my job."`
    );
  });
});

//Solution in book
//text.replace(/(^|\W)'|'(\W|$)/g, '$1"$2');

//Numbers again

describe('Numbers again', () => {
  test('Write a regex for all types of Javascript numbers', () => {
    //My solution
    let numberRegex = /^[+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
    //Solution in book
    /^[+\-]?(\d+(\.\d*)?|\.\d+)([eE][+\-]?\d+)?$/;
    let correctNumbers = [
      '1',
      '-1',
      '+15',
      '1.55',
      '.5',
      '5.',
      '1.3e2',
      '1E-4',
      '1e+12',
    ];
    let incorrectNumbers = [
      '1a',
      '+-1',
      '1.2.3',
      '1+1',
      '1e4.5',
      '.5.',
      '1f5',
      '.',
    ];
    expect(verify(numberRegex, correctNumbers, incorrectNumbers)).toEqual({
      matches: correctNumbers,
      wrongMatches: [],
    });
  });
});

//Tracking the scalpel

describe('Tracking the scalpel', () => {
  test(
    'Should return the location of the scalpel – first function should use async await,' +
      'the other just callback functions',
    async () => {
      const scalpelLocation = await locateScalpel(bigOak);
      const scalpelLocation2 = await locateScalpel2(bigOak);
      expect(scalpelLocation).toBe('Butcher Shop');
      expect(scalpelLocation2).toBe('Butcher Shop');
    }
  );
});

//Building Promise.all

describe('Building Promise.all', () => {
  test('Should function as Promise.all and resolve when all promises are resolved', () => {
    return Promise_all([soon(1), soon(2), soon(3)]).then((data) => {
      expect(data).toEqual([1, 2, 3]);
    });
  });
  test('Should function as Promise.all and resolve when all promises are resolved, otherwise reject', () => {
    expect.assertions(1);
    return Promise_all([soon(1), Promise.reject('X'), soon(3)]).catch((e) =>
      expect(e).toMatch('X')
    );
  });
});

//Arrays in Egg

describe('Arrays in Egg', () => {
  test(
    'The language Egg should have functions to create an array,' +
      'to get the length and the element at the nth position of an array',
    () => {
      //My solution
      //The second spread in an array is unnecessary

      topScope.array = (...values) => [...values];
      topScope.length = (array) => array.length;
      topScope.element = (array, i) => array[i];

      //Solution in book
      /* topScope.array = (...values) => values;
      topScope.length = (array) => array.length;      
      topScope.element = (array, i) => array[i]; */

      expect(
        run(`
do(define(sum, fun(array,
     do(define(i, 0),
        define(sum, 0),
        while(<(i, length(array)),
          do(define(sum, +(sum, element(array, i))),
             define(i, +(i, 1)))),
        sum))),
   print(sum(array(1, 2, 3))))
`)
      ).toEqual(6);
    }
  );
});

//Comments

describe('Comments in Egg', () => {
  test('Remove comments before parsing', () => {
    expect(parse('# hello\nx')).toEqual({ type: 'word', name: 'x' });
    expect(parse('a # one\n   # two\n()')).toEqual({
      type: 'apply',
      operator: { type: 'word', name: 'a' },
      args: [],
    });
  });
});

//Fixing scope

describe('Adding scope to Egg', () => {
  test(
    "Set should reassign value to defined variable, if variable doesn't" +
      'exist it should return a ReferenceError',
    () => {
      expect(
        run(`
do(define(x, 4),
   define(setx, fun(val, set(x, val))),
   setx(50),
   print(x))
`)
      ).toEqual(50);
      expect(() => run(`set(quux, true)`)).toThrow(
        'Variable quux does not exist'
      );
    }
  );
});
