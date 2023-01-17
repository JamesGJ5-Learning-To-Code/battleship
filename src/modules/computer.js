import arrayShuffle from 'array-shuffle';
import Player from './player';

export default class Computer extends Player {
  #attackSequence

  constructor(allShipCoordinates) {
    super(allShipCoordinates);
    this.generateAttackSequence();
  }

  generateAttackSequence() {
    const iSequence = arrayShuffle([...Array(10).keys()]);
    const jSequence = arrayShuffle([...Array(10).keys()]);
    this.#attackSequence = [];
    for (let iIndex = 0; iIndex < iSequence.length; iIndex += 1) {
      for (let jIndex = 0; jIndex < jSequence.length; jIndex += 1) {
        this.#attackSequence.push([iSequence[iIndex], jSequence[jIndex]]);
      }
    }
  }

  attackRandomly() {
    attackCoordinates = this.#attackSequence.pop();
    this.attackOpponent(attackCoordinates[0], attackCoordinates[1]);
  }
}
