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

  test('Ship is sunk when number of valid hits first reaches its length', () => {
    for (let i = 0; i < shipLength; i += 1) {
      ship.hit();
    }
    expect(ship.isSunk()).toBe(true);
  });
});
