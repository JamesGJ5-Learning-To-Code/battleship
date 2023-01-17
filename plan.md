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
