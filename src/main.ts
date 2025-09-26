import { initGame, softDrop, hardDrop, move, rotateCurrent } from './game';
import { drawGrid, drawPiece } from './render';
import './styles.css';

const COLS = 10;
const ROWS = 20;
const BLOCK = 30;

const canvas = document.getElementById('game') as HTMLCanvasElement;
canvas.width = COLS * BLOCK;
canvas.height = ROWS * BLOCK;
const ctx = canvas.getContext('2d')!;

const scoreEl = document.getElementById('score')!;
const linesEl = document.getElementById('lines')!;
const levelEl = document.getElementById('level')!;
const statusEl = document.getElementById('status')!;
const resetBtn = document.getElementById('reset')!;

let state = initGame(ROWS, COLS);
let lastTime = 0;
let dropCounter = 0;

function updateUI() {
  (scoreEl as HTMLElement).textContent = 'Score: ' + state.score;
  (linesEl as HTMLElement).textContent = 'Lignes: ' + state.lines;
  (levelEl as HTMLElement).textContent = 'Niveau: ' + state.level;
  statusEl.textContent = state.gameOver ? 'Game Over' : (state.paused ? 'Paused' : '');
}

function tick(time = 0) {
  if (state.paused || state.gameOver) {
    lastTime = time;
    requestAnimationFrame(tick);
    return;
  }
  const delta = time - lastTime;
  lastTime = time;
  dropCounter += delta;
  if (dropCounter > state.dropInterval) {
    dropCounter = 0;
    softDrop(state);
  }

  drawGrid(ctx, state.grid, BLOCK);
  drawPiece(ctx, state.current, state.pos, BLOCK);
  updateUI();
  requestAnimationFrame(tick);
}

document.addEventListener('keydown', (e) => {
  if (state.gameOver) return;
  if (e.key === 'ArrowLeft') move(state, -1);
  else if (e.key === 'ArrowRight') move(state, 1);
  else if (e.key === 'ArrowDown') softDrop(state);
  else if (e.key === 'ArrowUp') rotateCurrent(state);
  else if (e.code === 'Space') hardDrop(state);
  else if (e.key.toLowerCase() === 'p') state.paused = !state.paused;
  updateUI();
});

resetBtn.addEventListener('click', () => {
  state = initGame(ROWS, COLS);
  updateUI();
});

drawGrid(ctx, state.grid, BLOCK);
drawPiece(ctx, state.current, state.pos, BLOCK);
requestAnimationFrame(tick);
