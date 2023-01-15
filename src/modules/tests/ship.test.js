import Ship from '../ship';

describe('Ship.isSunk method', () => {
  const shipLength = 3;
  let ship;

  beforeEach(() => {
    ship = new Ship(shipLength);
  });

  test('Ship is initially unsunk', () => {
    expect(ship.isSunk()).toBe(false);
  });

  test('Ship is sunk when number of hits first reaches its length', () => {
    for (let i = 0; i < shipLength; i += 1) {
      ship.hit();
    }
    expect(ship.isSunk()).toBe(true);
  });

  test('Ship remains sunk after superfluous hits, although these should not be allowed to reach the ship because no place should be hit more than once', () => {
    for (let i = 0; i < shipLength + 1; i += 1) {
      ship.hit();
    }
    expect(ship.isSunk()).toBe(true);
  });
});
