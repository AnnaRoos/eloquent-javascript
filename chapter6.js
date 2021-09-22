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

  static from(itareble) {
    let values = [];
    for (const value of itareble) {
      if (!values.includes(value)) {
        values.push(value);
      }
    }
    return new Group(values);
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
} */


module.exports = { Vec, Group };
