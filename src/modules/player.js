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
    return this.#ownGameboard.receiveAttack(i, j);
  }

  attackOpponent(i, j) {
    // Because of how Gameboard this.receiveAttack is defined, the below
    // should return true if there was an unhit ship in the attack spot and false
    // otherwise
    if (this.opponent instanceof Player) {
      return this.opponent.receiveAttack(i, j);
    }
  }

  hasLost() {
    return this.#ownGameboard.afloatShipQuantity === 0;
  }
}
