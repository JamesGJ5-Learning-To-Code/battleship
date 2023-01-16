import Gameboard from '../gameboard';

describe('Gameboard instantiated with ships', () => {
  // allShipCoordinates = [[shipFormat], [[iStart, jStart], [end]] ...]
  const allShipCoordinates = [
    [
      [1, 1],
      [3, 1],
    ],
    [
      [3, 6],
      [3, 3],
    ],
    [
      [6, 4],
      [7, 4],
    ],
    [
      [9, 8],
      [2, 8],
    ],
  ];
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard(allShipCoordinates);
  });

  test('Gameboard does not report sinking if not all ships have not been sunk', () => {
    // The below for loop condition should ensure one ship is not hit at all
    for (let shipIndex = 0; shipIndex < allShipCoordinates.length - 1; shipIndex += 1) {
      const ship = allShipCoordinates[shipIndex];
      const start = ship[0];
      const end = ship[1];
      // The below should find all the coordinates occupied by current ship, by interpolating
      // between its start and end coordinates.
      for (let i = Math.min(start[0], end[0]); i < Math.max(start[0], end[0]) + 1; i += 1) {
        for (let j = Math.min(start[1], end[1]); j < Math.max(start[1], end[1]) + 1; j += 1) {
          gameboard.receiveAttack(i, j);
        }
      }
    }
    // TODO: later, replace allShipsSunk with some announcement that acts like a public
    // side-effect, like one at
    // https://medium.com/@jamesjefferyuk/javascript-what-are-pure-functions-4d4d5392d49c
    expect(gameboard.afloatShipQuantity).toBe(1);
  });

  test('Gameboard reports sinking as soon as all ships have been sunk', () => {
    for (let shipIndex = 0; shipIndex < allShipCoordinates.length; shipIndex += 1) {
      const ship = allShipCoordinates[shipIndex];
      const start = ship[0];
      const end = ship[1];
      for (let i = Math.min(start[0], end[0]); i < Math.max(start[0], end[0]) + 1; i += 1) {
        for (let j = Math.min(start[1], end[1]); j < Math.max(start[1], end[1]) + 1; j += 1) {
          gameboard.receiveAttack(i, j);
        }
      }
    }
    expect(gameboard.afloatShipQuantity).toBe(0);
  });

  test('Gameboard does not allow an attack to be received in the same place twice', () => {
    gameboard.receiveAttack(0, 0);
    expect(() => gameboard.receiveAttack(0, 0)).toThrow();
  });
});

describe('Gameboard instantiated without ships', () => {
  test('Gameboard reports sinking as soon as Gameboard is instantiated without ships', () => {
    const gameboard = new Gameboard([]);
    expect(gameboard.afloatShipQuantity).toBe(0);
  });
});
