import Ship from '../ship';

describe('Ship this.isSunk method', () => {
  let ship;
  const shipLength = 3;
  beforeEach(() => {
    ship = new Ship(shipLength);
  });

  test('Ship is not sunk if it receives fewer hits than its length', () => {
    for (let i = 0; i < shipLength - 1; i += 1) {
      ship.hit();
    }
    expect(ship.isSunk()).toBe(false);
  });

  test('Ship is sunk if it receives hits equal to its length', () => {
    for (let i = 0; i < shipLength; i += 1) {
      ship.hit();
    }
    expect(ship.isSunk()).toBe(true);
  });
});
