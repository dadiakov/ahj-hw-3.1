/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
import goblin from '../img/goblin.png';

const size = 4;
const timeout = 1000;
const container = document.querySelector('.game-container');
let loseCount = document.querySelector('.lose-count');
let winCount = document.querySelector('.win-count');
let startGame;

addTable(size);
startGame = setInterval(addPic, timeout);
container.addEventListener('click', crashHim);

function addTable(size) {
  const table = document.createElement('table');
  table.className = 'game-field';
  let count = 0;
  for (let i = 0; i < size; i++) {
    const tr = document.createElement('tr');
    for (let y = 0; y < size; y++) {
      const td = document.createElement('td');
      td.className = 'field-cell';
      td.id = count;
      tr.appendChild(td);
      count++;
    }
    table.appendChild(tr);
  }
  container.appendChild(table);
}

function addPic() {
  const index = Math.floor(Math.random() * (size ** 2));
  if (!document.getElementById(index).firstChild) {
    if (document.querySelector('.image')) loseCount.textContent++;
    if (loseCount.textContent >= 5) {
      clearInterval(startGame);
      container.removeEventListener('click', crashHim);
      console.log('Игра закончена');
    }
    const element = document.getElementById(index);
    document.querySelectorAll('.image').forEach((elem) => elem.remove());
    const pic = document.createElement('img');
    pic.src = goblin;
    pic.className = 'image';
    element.appendChild(pic);
  } else {
    addPic(size);
  }
  return null;
}

function crashHim(e) {
  if (e.target.classList.contains('image')) {
    container.classList.add('cursor');
    e.target.remove();
    setTimeout(() => container.classList.remove('cursor'), 300);
    winCount.textContent++;
  }
}

document.querySelector('.new-game').addEventListener('click', () => {
  clearInterval(startGame);
  document.querySelectorAll('.image').forEach((elem) => elem.remove());
  container.addEventListener('click', crashHim);
  winCount.textContent = 0;
  loseCount.textContent = 0;
  startGame = setInterval(addPic, timeout);
});
