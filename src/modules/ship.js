/* eslint-disable no-underscore-dangle */
// TODO: make this.length and this.hitsTaken private
export default class Ship {
  constructor(length) {
    this.length = length;
    this.hitsTaken = 0;
  }

  set length(value) {
    if (!Number.isInteger(value) || value < 1) {
      throw Error('The selected length must be an integer greater than 0');
    }
    this._length = value;
  }

  get length() {
    return this._length;
  }

  hit() {
    this.hitsTaken += 1;
  }

  //   isSunk() {}
}
