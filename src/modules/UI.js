import Player from './player';
import Computer from './computer';

// TODO: privatise properties and methods worth privatising
export default class UI {
  static human;

  static computer;

  static humanAllShipEnds = [
    [
      [1, 0],
      [1, 0],
    ],
    [
      [8, 2],
      [6, 2],
    ],
  ];

  static computerAllShipEnds = [
    [
      [5, 1],
      [5, 8],
    ],
    [
      [2, 2],
      [3, 2],
    ],
  ];

  static initialise() {
    UI.activateStartButton();
  }

  static activateStartButton() {
    const startButton = UI.getStartButton();
    startButton.addEventListener('click', UI.makePlayers);
  }

  static getStartButton() {
    return document.getElementById('start');
  }

  // TODO: consider refactoring into some sort of Game class
  static makePlayers() {
    UI.makeHuman();
    UI.makeComputer();
    UI.createEnmity();
  }

  static makeHuman() {
    // TODO: later, pass the coordinates that the user inputs on the page
    UI.human = new Player();
    UI.human.createOwnGameboard(UI.humanAllShipEnds);
    UI.displayHumanGameboard();
  }

  static makeComputer() {
    // TODO: later, pass random coordinates
    UI.computer = new Computer(UI.computerAllShipEnds);
    UI.computer.createOwnGameboard(UI.computerAllShipEnds);
    UI.displayComputerGameboard();
  }

  static createEnmity() {
    UI.human.opponent = UI.computer;
    UI.computer.opponent = UI.human;
  }

  static displayHumanGameboard() {
    const ownGameboardDiv = document.getElementById('ownGameboard');
    UI.makePlainGrid(ownGameboardDiv);
    UI.placeAllShips(ownGameboardDiv, UI.humanAllShipEnds);
  }

  static makePlainGrid(ownGameboardDiv) {
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        ownGameboardDiv.appendChild(UI.makeSquare(i, j));
      }
    }
  }

  static makeSquare(i, j) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.setAttribute('data-i', i);
    square.setAttribute('data-j', j);
    return square;
  }

  // TODO: refactor with similar code in ./gameboard.js
  static placeAllShips(gridContainer, allShipEnds) {
    for (let shipIndex = 0; shipIndex < allShipEnds.length; shipIndex += 1) {
      UI.placeShip(gridContainer, ...allShipEnds[shipIndex]);
    }
  }

  static placeShip(gridContainer, start, end) {
    const [iStart, jStart] = start;
    const [iEnd, jEnd] = end;
    for (let i = Math.min(iStart, iEnd); i < Math.max(iStart, iEnd) + 1; i += 1) {
      for (let j = Math.min(jStart, jEnd); j < Math.max(jStart, jEnd) + 1; j += 1) {
        UI.fillSquareWithShip(gridContainer, i, j);
      }
    }
  }

  static fillSquareWithShip(gridContainer, i, j) {
    const childIndex = 10 * i + j;
    const shipSquare = gridContainer.childNodes[childIndex];
    shipSquare.style.backgroundColor = 'grey';
  }

  static displayComputerGameboard() {
    const computerGameboardDiv = document.getElementById('opponentGameboard');
    UI.makePlainGrid(computerGameboardDiv);
  }
}
