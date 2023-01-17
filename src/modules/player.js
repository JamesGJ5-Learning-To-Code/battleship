import Gameboard from './gameboard';

export default class Player {
  #ownGameboard;

  constructor() {
    this.opponent = null;
  }

  createOwnGameboard(allShipEnds) {
    this.#ownGameboard = new Gameboard(allShipEnds);
  }

  receiveAttack(i, j) {
    this.#ownGameboard.receiveAttack(i, j);
  }

  attackOpponent(i, j) {
    this.opponent.receiveAttack(i, j);
  }

  hasLost() {
    return this.#ownGameboard.afloatShipQuantity === 0;
  }
}
