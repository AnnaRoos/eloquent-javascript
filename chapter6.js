//A vector type


//My solution
class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(vec) {
    return new Vec(this.x + vec.x, this.y + vec.y);
  };

  minus(vec) {
    return new Vec(this.x - vec.x, this.y - vec.y);
  };

  get length() {
    return Math.hypot(this.x, this.y);
  }
}

//Solution in book
/* class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(other) {
    return new Vec(this.x + other.x, this.y + other.y);
  }

  minus(other) {
    return new Vec(this.x - other.x, this.y - other.y);
  }

  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
} */

//Groups
//My solution

class Group {
  constructor(values) {
    this.values = [...values];
  }

  add(value) {
    if (!this.values.includes) {
      this.values.push(value);
    }
  }
  delete(value) {
    this.values = this.values.filter(val => val !== value);
  }

  has(value) {
    return this.values.includes(value);
  }

  static from(values) {
    let singles = [];
    for (const value of values) {
      if (!singles.includes(value)) {
        singles.push(value);
      }
    }
    return new Group(singles);
  }
}

//Solution from book
/* class Group {
  constructor() {
    this.members = [];
  }

  add(value) {
    if (!this.has(value)) {
      this.members.push(value);
    }
  }

  delete(value) {
    this.members = this.members.filter((v) => v !== value);
  }

  has(value) {
    return this.members.includes(value);
  }

  static from(collection) {
    let group = new Group();
    for (let value of collection) {
      group.add(value);
    }
    return group;
  }

    [Symbol.iterator]() {
    return new GroupIterator(this);
  }
} */


//Iterable Groups
//My solution
class GroupIterator {
  constructor(group) {
    this.x = 0;
    this.group = group;
  }

  next() {
    if (!this.group.values[this.x]) return { done: true }
    let value = this.group.values[this.x];
    this.x++;
    return {value: value, done: false}
  }
}

Group.prototype[Symbol.iterator] = function () {
  return new GroupIterator(this);
};

//Solution from book, the Symbol.iterator method is in the class above
/* class GroupIterator {
  constructor(group) {
    this.group = group;
    this.position = 0;
  }

  next() {
    if (this.position >= this.group.members.length) {
      return { done: true };
    } else {
      let result = { value: this.group.members[this.position], done: false };
      this.position++;
      return result;
    }
  }
}
 */

//Borrowing a method
//let map = {one: true, two: true, hasOwnProperty: true};
// Fix this call
//console.log(map.hasOwnProperty("one"));
// → true


//My solution
//console.log(hasOwnProperty.call(map, "one"));


//Solution in book
//console.log(Object.prototype.hasOwnProperty.call(map, 'one'));



module.exports = { Vec, Group };
