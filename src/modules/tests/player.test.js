import Player from '../player';

describe('Player this.hasLost method', () => {
  let player;
  beforeEach(() => {
    player = new Player();
    player.createOwnGameboard([
      [
        [1, 0],
        [1, 0],
      ],
    ]);
  });

  test('Player with a ship has not lost if its ship has not been destroyed', () => {
    expect(player.hasLost()).toBe(false);
  });

  test('Player with a ship has lost if its ship has been destroyed', () => {
    player.receiveAttack(1, 0);
    expect(player.hasLost()).toBe(true);
  });
});
