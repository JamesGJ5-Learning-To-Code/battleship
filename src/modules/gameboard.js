import Ship from './ship';

// TODO: privatise properties and methods that should be privatised
export default class Gameboard {
  constructor(allShipCoordinates) {
    // allShipCoordinates should be an array of arrays, each of the sub-arrays
    // providing information about the placement of one ship. This information
    // comes in the form of two further arrays, each of which contain a single
    // grid point (specifically its i and j values); these two arrays mark the
    // beginning and end of a ship. So,
    // [[[iStart, jStart], [iEnd, jEnd]], [ship2] ...]
    this.initialise(allShipCoordinates);
  }

  initialise(allShipCoordinates) {
    this.createGameboard(allShipCoordinates);
    // TODO: when doing DOM stuff, set this._afloatShipQuantity via a setter
    // that triggers an announcement after this._afloatShipQuantity is made 0
    // (by instantiation with empty coordinates or decrementation by
    // this.receiveAttack)
    this.afloatShipQuantity = allShipCoordinates.length;
  }

  createGameboard(allShipCoordinates) {
    this.gameboard = [...Array(10)].map(() => Array(10).fill(null));
    this.placeAllShips(allShipCoordinates);
  }

  placeAllShips(allShipCoordinates) {
    for (let shipIndex = 0; shipIndex < allShipCoordinates.length; shipIndex += 1) {
      this.placeShip(...allShipCoordinates[shipIndex]);
    }
  }

  placeShip(start, end) {
    const [iStart, jStart] = start;
    const [iEnd, jEnd] = end;
    Gameboard.validateCoordinateValues(iStart, jStart, iEnd, jEnd);
    const ship = Gameboard.makeShip(iStart, jStart, iEnd, jEnd);
    for (let i = Math.min(iStart, iEnd); i < Math.max(iStart, iEnd) + 1; i += 1) {
      for (let j = Math.min(jStart, jEnd); j < Math.max(jStart, jEnd) + 1; j += 1) {
        this.fillSquare(i, j, ship);
      }
    }
  }

  static validateCoordinateValues(iStart, jStart, iEnd, jEnd) {
    if (iStart !== iEnd && jStart !== jEnd) {
      throw Error('The ship must be either horizontal or vertical');
    } else if (
      [iStart, jStart, iEnd, jEnd].some((val) => !Number.isInteger(val) || val < 0 || val > 9)
    ) {
      throw Error('Coordinate values must be integers betweeen 0 and 9 inclusive');
    }
  }

  static makeShip(iStart, jStart, iEnd, jEnd) {
    let shipLength;
    if (iStart === iEnd) {
      shipLength = Math.abs(jEnd - jStart) + 1;
    } else if (jStart === jEnd) {
      shipLength = Math.abs(iEnd - iStart) + 1;
    }
    return new Ship(shipLength);
  }

  fillSquare(i, j, ship) {
    if (this.gameboard[i][j] !== null) {
      throw Error('Ships cannot be allowed to overlap');
    }
    this.gameboard[i][j] = ship;
  }

  receiveAttack(attackCoordinates) {}
}
