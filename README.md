Ship factory:
- Properties:
- 1. Length (private)
- 2. Number of times hit (probably "hit in different places"; however, if a hit part is marked then onwards as unselectable for future hits, this will just be equal to the number of hits) (private)
- Methods:
1. hit, which increases the number of hits on the ship (public)
2. isSunk, which calculates whether the ship is sunk or not (e.g. by returning true or false respectively) based on the number of hits and the length of the ship (i.e. if number of hits === length) (public)
- Only test public interface (i.e. methods/properties used outside of the object alone need unit tests) 

Gameboard factory:
- Can place ships at specific coordinates by calling the ship factory function
- Methods:
- 1. receiveAttack, which takes a pair of coordinates, determines whether or not the attack hit a ship, then calls Ship.hit on the correct ship, or records the coordinates of the missed shot (so the player that was nearly hit knows which squares will not hit next time, and these can be displayed as such)
- Keeps track of missed attacks so they can be displayed properly
- Report sinking of all ships if it happens

Player factory:
- Take turns playing the game by attack the enemy Gameboard
- Game is played against computer, so make "computer" players capable of random plays. The computer should never shoot the same coordinate twice