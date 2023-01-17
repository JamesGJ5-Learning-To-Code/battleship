Ship:

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



Gameboard:

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
---- 4. The longer ship being hit once resulting in afloatShipQuantity remaining as 1
---- 5. All squares with ships being hit once resulting in afloatShipQuantity becoming 0

--> YES the Ship.hit method called by receiveAttack: this is an outgoing command so must ensure it is really called when expected. This is typically done via mocking, HOWEVER, the above tests will implicitly state whether hit() is sent, because if it is not, then the afloatShipQuantity will never decrease, because no Ship will ever become sunk, so don't worry in this particular case.
