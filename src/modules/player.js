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
    if (this.opponent instanceof Player) {
      this.opponent.receiveAttack(i, j);
    }
  }

  hasLost() {
    return this.#ownGameboard.afloatShipQuantity === 0;
  }
}
