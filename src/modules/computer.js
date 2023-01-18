/* eslint-disable no-param-reassign */
import Player from './player';

export default class Computer extends Player {
  #attackSequence;

  constructor(allShipCoordinates) {
    super(allShipCoordinates);
    this.#generateAttackSequence();
  }

  #generateAttackSequence() {
    const iSequence = Computer.#makeRandomCoordinateValues();
    const jSequence = Computer.#makeRandomCoordinateValues();
    this.#attackSequence = [];
    for (let iValueIndex = 0; iValueIndex < iSequence.length; iValueIndex += 1) {
      for (let jValueIndex = 0; jValueIndex < jSequence.length; jValueIndex += 1) {
        this.#addCoordinatePair(iSequence[iValueIndex], jSequence[jValueIndex]);
      }
    }
  }

  static #makeRandomCoordinateValues() {
    // TODO: This comes from
    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array,
    // should replace with an imported module or something

    // return arrayShuffle([...Array(10).keys()]);
    return Computer.#shuffle([...Array(10).keys()]);
  }

  static #shuffle(array) {
    let currentIndex = array.length;
    let randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  #addCoordinatePair(i, j) {
    this.#attackSequence.push([i, j]);
  }

  attackRandomly() {
    if (this.opponent instanceof Player || this.opponent instanceof Computer) {
      const attackCoordinates = this.#attackSequence.pop();
      this.attackOpponent(attackCoordinates[0], attackCoordinates[1]);
    }
  }
}
