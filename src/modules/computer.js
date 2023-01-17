import arrayShuffle from 'array-shuffle';
import Player from './player';

export default class Computer extends Player {
  #attackSequence;

  constructor(allShipCoordinates) {
    super(allShipCoordinates);
    this.#generateAttackSequence();
  }

  #generateAttackSequence() {
    const iSequence = Computer.#makeRandomCoordinateValues;
    const jSequence = Computer.#makeRandomCoordinateValues;
    this.#attackSequence = [];
    for (let iValueIndex = 0; iValueIndex < iSequence.length; iValueIndex += 1) {
      for (let jValueIndex = 0; jValueIndex < jSequence.length; jValueIndex += 1) {
        this.#addCoordinatePair(iSequence[iValueIndex], jSequence[jValueIndex]);
      }
    }
  }

  static #makeRandomCoordinateValues() {
    return arrayShuffle([...Array(10).keys()]);
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
