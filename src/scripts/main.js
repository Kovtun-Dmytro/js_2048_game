'use strict';

// Uncomment the next lines to use your game instance in the browser
const Game = require('../../src/modules/Game.class');

const game = new Game();

function updateGameField() {
  const fieldCells = document.querySelectorAll('.field-cell');
  let index = 0;

  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      const cell = fieldCells[index];
      const tileValue = game.board[r][c];

      if (tileValue !== 0) {
        cell.textContent = tileValue;
        cell.className = 'field-cell field-cell--' + tileValue;
      } else {
        cell.textContent = '';
        cell.className = 'field-cell';
      }
      index++;
    }
  }
}

function updateScore() {
  const scoreDisplay = document.querySelector('.game-score');

  scoreDisplay.textContent = game.score;
}

const startButton = document.querySelector('.start');
const restartButton = document.querySelector('.restart');

function checkGameStatus() {
  const winMessage = document.querySelector('.message-win');
  const loseMessage = document.querySelector('.message-lose');
  const startMessage = document.querySelector('.message-start');

  // if (game.status === 'win' || game.status === 'lose') {
  //   startButton.classList.add('hidden');
  //   restartButton.classList.remove('hidden');
  // } else {
  //   startButton.classList.remove('hidden');
  //   restartButton.classList.add('hidden');
  // }

  if (game.status === 'win') {
    winMessage.classList.remove('hidden');
    loseMessage.classList.add('hidden');
    startMessage.classList.add('hidden');
  } else if (game.status === 'lose') {
    loseMessage.classList.remove('hidden');
    winMessage.classList.add('hidden');
    startMessage.classList.add('hidden');
  } else {
    winMessage.classList.add('hidden');
    loseMessage.classList.add('hidden');
    startMessage.classList.remove('hidden');
  }
}

startButton.addEventListener('click', () => {
  if (game.status === 'idle') {
    game.start();
    updateGameField();
    updateScore();
    checkGameStatus();
  }
});

restartButton.addEventListener('click', () => {
  game.restart();
  updateGameField();
  updateScore();
  checkGameStatus();
});

document.addEventListener('keydown', (e) => {
  if (game.status === 'playing') {
    switch (e.key) {
      case 'ArrowLeft':
        game.moveLeft();
        break;
      case 'ArrowRight':
        game.moveRight();
        break;
      case 'ArrowUp':
        game.moveUp();
        break;
      case 'ArrowDown':
        game.moveDown();
        break;
    }

    updateGameField();
    updateScore();
    checkGameStatus();
  }
});

updateGameField();
updateScore();
checkGameStatus();
