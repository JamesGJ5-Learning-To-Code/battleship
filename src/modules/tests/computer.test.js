import Computer from '../computer';
import Player from '../player';

describe('Computer this.attackRandomly method', () => {
  let computer;
  let humanPlayer;
  beforeEach(() => {
    computer = new Computer();
    humanPlayer = new Player();
    computer.opponent = humanPlayer;
    humanPlayer.createOwnGameboard([
      [
        [0, 0],
        [0, 9],
      ],
      [
        [1, 0],
        [1, 9],
      ],
      [
        [2, 0],
        [2, 9],
      ],
      [
        [3, 0],
        [3, 9],
      ],
      [
        [4, 0],
        [4, 9],
      ],
      [
        [5, 0],
        [5, 9],
      ],
      [
        [6, 0],
        [6, 9],
      ],
      [
        [7, 0],
        [7, 9],
      ],
      [
        [8, 0],
        [8, 9],
      ],
      [
        [9, 0],
        [9, 9],
      ],
    ]);
  });

  test('Opponent has not lost if Computer this.attackRandomly method not called', () => {
    expect(humanPlayer.hasLost()).toBe(false);
  });

  test('Opponent has lost when this.attackRandomly has been called enough times', () => {
    for (let i = 0; i < 100; i += 1) {
      computer.attackRandomly();
    }
    expect(humanPlayer.hasLost()).toBe(true);
  });
});
