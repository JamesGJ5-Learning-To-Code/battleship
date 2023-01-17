import Gameboard from './gameboard';

export default class Player {
  #ownGameboard;

  constructor(allShipCoordinates) {
    this.#ownGameboard = new Gameboard(allShipCoordinates);
    this.opponent = null;
  }

  attackOpponent(i, j) {
    this.opponent.receiveAttack(i, j);
  }
}
