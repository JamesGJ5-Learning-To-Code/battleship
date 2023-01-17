import arrayShuffle from 'array-shuffle';
import Player from './player';

export default class Computer extends Player {
  #attackSequence;

  constructor(allShipCoordinates) {
    super(allShipCoordinates);
    this.generateAttackSequence();
  }

  generateAttackSequence() {
    const iSequence = arrayShuffle([...Array(10).keys()]);
    const jSequence = arrayShuffle([...Array(10).keys()]);
    this.#attackSequence = [];
    for (let iValueIndex = 0; iValueIndex < iSequence.length; iValueIndex += 1) {
      for (let jValueIndex = 0; jValueIndex < jSequence.length; jValueIndex += 1) {
        this.#attackSequence.push([iSequence[iValueIndex], jSequence[jValueIndex]]);
      }
    }
  }

  attackRandomly() {
    const attackCoordinates = this.#attackSequence.pop();
    this.attackOpponent(attackCoordinates[0], attackCoordinates[1]);
  }
}
