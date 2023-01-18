import Player from './player';
import Computer from './computer';

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
  }

  static createEnmity() {
    UI.human.opponent = UI.computer;
    UI.computer.opponent = UI.human;
  }

  static displayHumanGameboard() {
    const ownGameboardDiv = document.getElementById('ownGameboard');
    UI.makePlainGrid(ownGameboardDiv);
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
}
