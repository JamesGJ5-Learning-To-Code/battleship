// import Gameboard from '../gameboard';

// describe('Gameboard instantiated with ships', () => {
//   // allShipEnds = [[shipFormat], [[iStart, jStart], [end]] ...]
//   const allShipEnds = [
//     [
//       [1, 1],
//       [3, 1],
//     ],
//     [
//       [3, 6],
//       [3, 3],
//     ],
//     [
//       [6, 4],
//       [7, 4],
//     ],
//     [
//       [9, 8],
//       [2, 8],
//     ],
//   ];
//   let gameboard;

//   beforeEach(() => {
//     gameboard = new Gameboard(allShipEnds);
//   });

//   test('Gameboard does not report sinking if not all ships have not been sunk', () => {
//     // The below for loop condition should ensure one ship is not hit at all
//     for (let shipIndex = 0; shipIndex < allShipEnds.length - 1; shipIndex += 1) {
//       const ship = allShipEnds[shipIndex];
//       const start = ship[0];
//       const end = ship[1];
//       // The below should find all the coordinates occupied by current ship, by interpolating
//       // between its start and end coordinates.
//       for (let i = Math.min(start[0], end[0]); i < Math.max(start[0], end[0]) + 1; i += 1) {
//         for (let j = Math.min(start[1], end[1]); j < Math.max(start[1], end[1]) + 1; j += 1) {
//           gameboard.receiveAttack(i, j);
//         }
//       }
//     }
//     // TODO: later, replace allShipsSunk with some announcement that acts like a public
//     // side-effect, like one at
//     // https://medium.com/@jamesjefferyuk/javascript-what-are-pure-functions-4d4d5392d49c
//     expect(gameboard.afloatShipQuantity).toBe(1);
//   });

//   test('Gameboard reports sinking as soon as all ships have been sunk', () => {
//     for (let shipIndex = 0; shipIndex < allShipEnds.length; shipIndex += 1) {
//       const ship = allShipEnds[shipIndex];
//       const start = ship[0];
//       const end = ship[1];
//       for (let i = Math.min(start[0], end[0]); i < Math.max(start[0], end[0]) + 1; i += 1) {
//         for (let j = Math.min(start[1], end[1]); j < Math.max(start[1], end[1]) + 1; j += 1) {
//           gameboard.receiveAttack(i, j);
//         }
//       }
//     }
//     expect(gameboard.afloatShipQuantity).toBe(0);
//   });

//   test('Gameboard does not allow an attack to be received in the same place twice', () => {
//     gameboard.receiveAttack(0, 0);
//     expect(() => gameboard.receiveAttack(0, 0)).toThrow();
//   });
// });

// describe('Gameboard instantiated without ships', () => {
//   test('Gameboard reports sinking as soon as Gameboard is instantiated without ships', () => {
//     const gameboard = new Gameboard([]);
//     expect(gameboard.afloatShipQuantity).toBe(0);
//   });
// });

import Gameboard from '../gameboard';

describe('Gameboard.receiveAttack method', () => {
  let gameboard;
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
  beforeEach(() => {
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
});
