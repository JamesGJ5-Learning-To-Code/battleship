export default class Ship {
  #hitsTaken;

  #lengthValue;

  constructor(length) {
    this.#length = length;
    this.#hitsTaken = 0;
  }

  set #length(value) {
    if (!Number.isInteger(value) || value < 1) {
      throw new Error('The selected length must be an integer greater than 0');
    }
    this.#lengthValue = value;
  }

  get #length() {
    return this.#lengthValue;
  }

  hit() {
    this.#hitsTaken += 1;
  }

  isSunk() {
    return this.#hitsTaken >= this.#length;
  }
}
