import Gameboard from '../gameboard';

describe('Gameboard.receiveAttack method', () => {
  let gameboard;
  beforeEach(() => {
    const allShipEnds = [
      [
        [1, 0],
        [1, 0],
      ],
      [
        [8, 2],
        [6, 2],
      ],
    ];
    gameboard = new Gameboard(allShipEnds);
  });

  test('Hitting water does not affect afloatShipQuantity', () => {
    gameboard.receiveAttack(0, 0);
    expect(gameboard.afloatShipQuantity).toBe(2);
  });

  test('The smaller ship being hit once decrementing afloatShipQuantity', () => {
    gameboard.receiveAttack(1, 0);
    expect(gameboard.afloatShipQuantity).toBe(1);
  });

  test('The smaller ship being hit twice simply decrementing afloatShipQuantity once', () => {
    for (let i = 0; i < 2; i += 1) {
      gameboard.receiveAttack(1, 0);
    }
    expect(gameboard.afloatShipQuantity).toBe(1);
  });

  test('The longer ship being hit just once not affecting afloatShipQuantity', () => {
    gameboard.receiveAttack(8, 2);
    expect(gameboard.afloatShipQuantity).toBe(2);
  });

  test('The longer ship being hit at all positions decrementing afloatShipQuantity', () => {
    for (let i = 6; i <= 8; i += 1) {
      gameboard.receiveAttack(i, 2);
    }
    expect(gameboard.afloatShipQuantity).toBe(1);
  });

  test('All ships being hit in all areas making afloatShipQuantity 0', () => {
    gameboard.receiveAttack(1, 0);
    for (let i = 6; i <= 8; i += 1) {
      gameboard.receiveAttack(i, 2);
    }
    expect(gameboard.afloatShipQuantity).toBe(0);
  });
});
