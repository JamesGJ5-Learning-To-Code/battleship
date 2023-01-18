SHIP:

An object representing a ship in a game of battleship. It should be able to be hit by opponent players and indicate whether or not it has sunk or not.

-> Properties suggested by TOP:
--> Length
--> Number of hits taken
--> Whether or not ship has been sunk

-> Methods suggested by TOP:
--> hit, which increments property for number of hits taken
--> isSunk, which calculates whether the ship is sunk or not based on length and number of hits taken (will make the corresponding attribute redundant)

-> Properties chosen:
--> length (private)
--> hitsTaken (private)

-> Methods chosen:
--> hit (public command)
--> isSunk (public query)


-> Required tests to Ship:

--> NOT hit: incoming public command, so tests should only make assertions about direct, public side-effects. hit simply modifies hitsTaken, the act of which is a private side-effect.

--> YES isSunk: incoming public query, so tests should make assertions about returned results (Boolean indicating true or false, ideally). Examples:

--- 1. Ship of given length receives a number of hits less than said length: Ship.isSunk should return false
--- 2. Ship of given length receives a number of hits the same as said length: Ship.isSunk should return true



GAMEBOARD:

An object representing a 10x10 gameboard in battleship. It should have various squares, each at a different location (indicated by coordinates). One should be able to place ships on it in chosen places and receive an attack to the gameboard. The gameboard should also indicate whether or not it has been sunk, via whether all of its ships have been sunk.

-> Properties suggested by TOP:
--> Missed attacks

-> Methods suggested by TOP:
--> receiveAttack, which accepts a coordinate pair, determines whether there's a ship at that location and sends 'hit' to it if there is. If there isn't, the missed shots should be recorded
--> allSunk, which reports whether or not all ships have been sunk
--> placeAllShips, which places ships at specific coordinates by calling the ship factory function

-> Properties chosen:
--> gameboard (private):
---> This is a 10x10 grid which contains a reference to a ship where there is an unhit area of ship, a 'null' where there is an unhit area of water, and a lowercase 'x' where there is a hit are (whatever is in it). This will be used by the method Gameboard.receiveAttack as indicated below

-> Methods chosen:

--> receiveAttack (public):
---> Takes coordinate pair, looks at the corresponding element in Gameboard.gameboard, and:
----> If there's a null (it's water), simply replaces that element with an 'x'
----> If there's an 'x' (it's an already-hit area), simply does nothing (or reuses the above condition's code for conciseness)--it is not the Gameboard's responsibility to ensure no spot is attacked twice, but the Game, for example, based on the rules of the Game.
----> If there's a ship reference there, sends a 'hit' to the ship
-----> If a ship is hit and sinks, afloatShipQuantity (see below) should be decreased by 1

--> allSunk (public):
---> Reports whether all ships on the gameboard have been sunk or not. Does this by, ultimately, checking whether all included Ship objects returns true when Ship.isSunk is called upon each of them OR looking through each element in Gameboard.gameboard to ensure there's no ship reference in there. Both can take significant iteration and complexity, so perhaps instead it would be wise to have a property called 'afloatShipQuantity' that implicitly indicates sinking of all ships when this number becomes 0 INSTEAD of having a method called allSunk
---> Note, depending on whether any coordinates are passed when constructing the Gameboard, there may be no Ships at all, so one should probably ensure the Player MUST select coordinates

--> placeAllShips (private):
---> Does as TOP suggested above, impacting the gameboard.

-> More:
--> Ships placed shouldn't be able to overlap
--> Ships shouldn't attempt to be placed outside the gameboard array


-> Required tests to Gameboard:

--> YES receiveAttack: incoming command message which may impact Gameboard.afloatShipQuantity, which is a public property. Example tests:

---> For a Gameboard instantiated with 2 ships (of lengths 1 and 2) in different sets of squares on the board:

---- 1. receiveAttack done on a square of water should result in afloatShipQuantity remaining at 2
---- 2. The smaller ship being hit once resulting in afloatShipQuantity becoming 1
---- 3. The smaller ship being hit twice resulting in afloatShipQuantity still being 1
---- 4. The longer ship being hit once resulting in afloatShipQuantity remaining as 2
---- 5. All squares with ships being hit once resulting in afloatShipQuantity becoming 0

--> YES the Ship.hit method called by receiveAttack: this is an outgoing command so must ensure it is really called when expected. This is typically done via mocking, HOWEVER, the above tests will implicitly state whether hit() is sent, because if it is not, then the afloatShipQuantity will never decrease, because no Ship will ever become sunk, so don't worry in this particular case.



PLAYER:

Represents someone playing a game. Able to have a Gameboard object and attack enemy coordinates, and send received attacks to its own Gameboard. Also should be able to say whether they have lost or not.

-> Properties suggested by TOP:
--> Own Gameboard object

-> Methods suggested by TOP:
--> attackOpponent, which attempts to attack the opponent at passed coordinates

-> Properties chosen:
--> ownGameboard (private)
--> opponent (public, as should be able to be set by the Player or some other entity, like the game loop)

-> Methods chosen:
--> createOwnGameboard (public), which takes coordinates and make Player.ownGameboard out of them
--> receiveAttack (public), which takes coordinates and calls ownGameboard.receiveAttack. Doesn't have to make sure coordinates haven't already been attacked, that'll be down to the outer game.
--> attackOpponent (public), which simply triggers opponent.receiveAttack with chosen coordinates
--> hasLost (public), which indicates whether ownGameboard.afloatShipQuantity is 0 or not


-> Required tests to Player:

--> YES hasLost: instantiate Player with 1 ship, kill it using Player.receiveAttack, and assert that hasLost returns true; in another test, don't attack it at all and assert hasLost returns false.

--> YES attackOpponent--have to ensure that opponent.receiveAttack is sent because it is an outgoing command. Can do this by mocking, but can also do this implicitly by instantiating some sort of opponent Player, giving them a ship of length 1 initially, setting this opponent as the opponent of Player1, making Player1 attack the new opponent, and asserting that the opponent hasLost.



COMPUTER:

A Player capable of making random plays. Shouldn't make the same move twice.

-> Chosen properties:
--> randomAttackSequence (private)

-> Chosen methods:
--> attackRandomly (public), which simply calls Computer.attackOpponent passing coordinates from randomAttackSequence


-> Required tests to player:

--> YES attackRandomly. Do this by instantiating an opponent, giving it ships, and ensuring that when attackRandomly has not been called, opponent.hasLost is false, but when attackRandomly has been called 100 times, opponent.hasLost is true.



MAIN GAME LOOP AND MODULE FOR DOM INTERACTION (UI)

-> TOP suggestions:

-- 1. Game loop sets up new game by making Players and Gameboards, for now just populated with predetermined coordinates.

-- 2. Display both the player's boards and render them using information from the Gameboard class:
---> Need methods to:
---- 1. Render the gameboards
---- 2. Take user input for attacking
---> For attacks, let user click coordinate in enemy Gameboard

-- 3. Gameboard steps through game turn by turn using only methods from other objects.

-- 4. Create conditions so the game ends once one player's ships have all been sunk. This function is appropriate for the Game module.


-> My workflow:

-- 1. In a primitive version of the completed app, things would be set up by allowing the user to type in the coordinates for the ends of each ship, then clicking a start button. If the coordinates were unsatisfactory, the user would be told to input them again. Otherwise, the game would begin...

-- 2. Upon the game beginning, the user's gameboard would visually be populated by their ships, and an empty-looking gameboard would show up for the CPU. Under the surface, the user's choices would render their own gameboard, and the CPU's gameboard would be rendered randomly.

-- 3. So, while I am initialising things with predetermined coordinates, it would still be apt to have things begin when I click the start button. At this point, the event listener for such a click should make a Player object and a Computer object (for human and CPU respectively). For the #ownGameboard of each, instead of taking coordinates from the UI (for the human) and randomly (for the Computer), Player.createOwnGameboard and Computer.createOwnGameboard would be made with predetermined coordinates.

-- 4. For now, let's say the human is the player that starts. Whenever it becomes the human's turn, the opponent gameboard is clickable, and they can click a square on it (and immediately the opponent gameboard becomes unclickable to prevent multiple attacks in one go while the following logic is operating).
-- If the attack simply hits water, we just record an X on the square with a blue background; however, if the attack hits a ship, we record an X on the square with a white background
-- Afterwards, we check if the opponent has lost, and if it has, we record that in some sort of div on the page and have some restart button the user can use to (you guessed it) restart the game--let this button be ever-present.
-- If the human hasn't lost, the turn switches to the Computer, and they do all the same things as above same things but with a random attack.

--> DONE Now, in Step 4 above, seeing whether the attack hits the CPU's ship or just water requires the CPU to report this. So, the easiest way to do this would probably be to allow Gameboard this.receiveAttack to return the nature of what was already in the hit spot. Fortunately, this shouldn't affect any test suites.