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

describe('Player this.attackOpponent method', () => {
  let player;
  let opponent;
  beforeEach(() => {
    player = new Player();
    opponent = new Player();
    opponent.createOwnGameboard([
      [
        [1, 0],
        [1, 0],
      ],
    ]);
    player.opponent = opponent;
  });

  test('this.opponent.receiveAttack is not sent if this.attackOpponent is not called', () => {
    expect(opponent.hasLost()).toBe(false);
  });

  test('this.opponent.receiveAttack is sent when this.attackOpponent is called', () => {
    player.attackOpponent(1, 0);
    expect(opponent.hasLost()).toBe(true);
  });
});
