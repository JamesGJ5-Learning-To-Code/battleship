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
- Properties:
- 1. Gameboard array, i.e. an array containing 10 arrays each with 10 elements. Initially, any square not covered by a ship will have a null at the corresponding array position and any square covered by a ship will have a reference to the Ship object in the corresponding array position. When a square is hit, it will contain a lowercase 'x' and this is what will mark the square as hit (so that the computer can't hit the same spot again; the DOM will count out this spot so that the human player can't click it again as well).
- 2. afloatShipQuantity--when this decreases to 0, a winner will be announced. Set this using a setter, and the setter should trigger the announcement whenever alfoatShipQuantity is 0. For this reason, Gameboard should only be initialised when after all ships have been created and their positions chosen.
<!-- TODO: later, replace the below with a public side-effect like some sort of announcement, the type of side-effect being like one from https://medium.com/@jamesjefferyuk/javascript-what-are-pure-functions-4d4d5392d49c and then change the test suite accordingly -->
- Methods:
- 1. receiveAttack, which takes a pair of coordinates, determines whether or not the attack hit a ship, then calls Ship.hit on the correct ship, or records the coordinates of the missed shot (so the player that was nearly hit knows which squares will not hit next time, and these can be displayed as such). If a hit kills a ship (check using isSunk), decrease afloatShipQuantity. (public)
 - 2. placeShips, which takes the coordinates of the ship and, if the coordinates are acceptable (i.e. they are contiguous, they are linear (horizontally or vertically), they are actually on the board and they aren't already occupied), creates a Ship object with a length property equal to the number of coordinate points, and places the references to the object in the correct position. May just pass the beginning and end coordinates, since that will tell us what grid points are in between. If coordinates not acceptable, throw an error. (private)
- Keeps track of missed attacks so they can be displayed properly (this is done 
using x's on the gameboard)
- Report sinking of all ships if it happens (done by the afloatShipQuantity setter)

Player factory (or module, if CPU won't have its own Player):
- Take turns playing the game by attack the enemy Gameboard
- Game is played against computer, so make "computer" players capable of random plays. The computer should never shoot the same coordinate twice