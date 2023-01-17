import Ship from './ship';

export default class Gameboard {
  #gameboard;

  constructor(allShipEnds) {
    // allShipEnds should be an array of arrays, each of the sub-arrays
    // providing information about the placement of one ship. This information
    // comes in the form of two further arrays, each of which contain a single
    // grid point (specifically its i and j values); these two arrays mark the
    // beginning and end of a ship. So,
    // [[[iStart, jStart], [iEnd, jEnd]], [ship2] ...]
    this.initialise(allShipEnds);
  }

  initialise(allShipEnds) {
    this.#createGameboard(allShipEnds);
    this.afloatShipQuantity = allShipEnds.length;
  }

  #createGameboard(allShipEnds) {
    // TODO: later, make the size of the board configurable and change the rest
    // of the app accordingly
    this.#gameboard = [...Array(10)].map(() => Array(10).fill(null));
    this.#placeAllShips(allShipEnds);
  }

  #placeAllShips(allShipEnds) {
    for (let shipIndex = 0; shipIndex < allShipEnds.length; shipIndex += 1) {
      this.#placeShip(...allShipEnds[shipIndex]);
    }
  }

  #placeShip(start, end) {
    const [iStart, jStart] = start;
    const [iEnd, jEnd] = end;
    Gameboard.#validateCoordinateValues(iStart, jStart, iEnd, jEnd);
    const ship = Gameboard.#makeShip(iStart, jStart, iEnd, jEnd);
    for (let i = Math.min(iStart, iEnd); i < Math.max(iStart, iEnd) + 1; i += 1) {
      for (let j = Math.min(jStart, jEnd); j < Math.max(jStart, jEnd) + 1; j += 1) {
        this.#fillSquare(i, j, ship);
      }
    }
  }

  static #validateCoordinateValues(iStart, jStart, iEnd, jEnd) {
    if (iStart !== iEnd && jStart !== jEnd) {
      throw new Error('The ship must be either horizontal or vertical');
    } else if (
      [iStart, jStart, iEnd, jEnd].some((val) => !Number.isInteger(val) || val < 0 || val > 9)
    ) {
      throw new Error('Coordinate values must be integers betweeen 0 and 9 inclusive');
    }
  }

  static #makeShip(iStart, jStart, iEnd, jEnd) {
    let startToEndVector;
    if (iStart === iEnd) {
      startToEndVector = jEnd - jStart;
    } else if (jStart === jEnd) {
      startToEndVector = iEnd - iStart;
    }
    const shipLength = Math.abs(startToEndVector) + 1;
    return new Ship(shipLength);
  }

  #fillSquare(i, j, ship) {
    if (this.#gameboard[i][j] !== null) {
      throw new Error('Ships cannot be allowed to overlap');
    }
    this.#gameboard[i][j] = ship;
  }

  receiveAttack(i, j) {
    const squareContents = this.#gameboard[i][j];
    if (squareContents === 'x') {
      throw new Error('Attacks must not hit the same place twice');
    } else if (squareContents instanceof Ship) {
      this.#receiveHitToShip(squareContents);
    }
    this.#markSquareAsHit(i, j);
  }

  #receiveHitToShip(ship) {
    ship.hit();
    this.afloatShipQuantity -= ship.isSunk();
  }

  #markSquareAsHit(i, j) {
    this.#gameboard[i][j] = 'x';
  }
}
