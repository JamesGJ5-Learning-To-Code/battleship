import Gameboard from './gameboard';

export default class Player {
  #ownGameboard;

  #opponent;

  constructor() {
    this.#opponent = null;
  }

  createOwnGameboard(allShipEnds) {
    this.#ownGameboard = new Gameboard(allShipEnds);
  }

  attackOpponent(i, j) {
    this.opponent.receiveAttack(i, j);
  }
}
