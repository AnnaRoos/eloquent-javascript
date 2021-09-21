//A vector type

class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus = (vec) => {
    return new Vec(this.x + vec.x, this.y + vec.y);
  };

  minus = (vec) => {
    return new Vec(this.x - vec.x, this.y - vec.y);
  };

  get length() {
    return;
  }
}

console.log(new Vec(1, 2).plus(new Vec(2, 3)));

module.exports = { Vec };
