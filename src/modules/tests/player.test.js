import Player from '../player';

describe('Player.attackOpponent method tests', () => {
  beforeEach(() => {
    const playerCoordinates = [
      [
        [1, 2],
        [5, 2],
      ],
    ];
    const opponentCoordinates = [
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
    const player = new Player(playerCoordinates);
    const opponent = new Player(opponentCoordinates);
  });
});
