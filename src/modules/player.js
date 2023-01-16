import Gameboard from './gameboard';

export default class Player {
  constructor(allShipCoordinates) {
    this.ownGameboard = new Gameboard(allShipCoordinates);
    this.opponent = null;
  }

  //   attackOpponent(i, j) {}
}
