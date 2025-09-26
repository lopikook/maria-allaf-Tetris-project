import { createGrid, collides, mergePiece, clearLines } from './grid';
import { randomTetromino, rotate } from './tetromino';
import type { Matrix } from './tetromino';

export type GameState = {
  grid: Matrix,
  current: Matrix,
  next: Matrix,
  pos: {x:number,y:number},
  cols: number,
  rows: number,
  score: number,
  lines: number,
  level: number,
  dropInterval: number,
  paused: boolean,
  gameOver: boolean
};

export function initGame(rows:number, cols:number): GameState {
  const grid = createGrid(rows, cols);
  const cur = randomTetromino().matrix;
  const nxt = randomTetromino().matrix;
  const pos = { x: Math.floor(cols / 2) - 1, y: -1 };
  return {
    grid, current: cur, next: nxt, pos, cols, rows,
    score: 0, lines: 0, level: 1, dropInterval: 1000, paused:false, gameOver:false
  };
}

export function spawnNext(state: GameState) {
  state.current = state.next;
  state.next = randomTetromino().matrix;
  state.pos = { x: Math.floor(state.cols/2) - 1, y: -1 };
  if (collides(state.grid, state.current, state.pos, state.cols, state.rows)) {
    state.gameOver = true;
  }
}

export function softDrop(state: GameState) {
  const newPos = { x: state.pos.x, y: state.pos.y + 1 };
  if (!collides(state.grid, state.current, newPos, state.cols, state.rows)) {
    state.pos = newPos;
  } else {
    mergePiece(state.grid, state.current, state.pos);
    const cleared = clearLines(state.grid, state.cols);
    if (cleared > 0) {
      state.lines += cleared;
      state.score += cleared * 100 * state.level;
      const newLevel = Math.floor(state.lines / 10) + 1;
      if (newLevel > state.level) {
        state.level = newLevel;
        state.dropInterval = Math.max(100, 1000 - (state.level - 1) * 100);
      }
    }
    spawnNext(state);
  }
}

export function hardDrop(state: GameState) {
  while (!collides(state.grid, state.current, {x: state.pos.x, y: state.pos.y + 1}, state.cols, state.rows)) {
    state.pos.y++;
  }
  mergePiece(state.grid, state.current, state.pos);
  const cleared = clearLines(state.grid, state.cols);
  if (cleared > 0) {
    state.lines += cleared;
    state.score += cleared * 100 * state.level;
    const newLevel = Math.floor(state.lines / 10) + 1;
    if (newLevel > state.level) {
      state.level = newLevel;
      state.dropInterval = Math.max(100, 1000 - (state.level - 1) * 100);
    }
  }
  spawnNext(state);
}

export function move(state: GameState, dx:number) {
  const pos = {x: state.pos.x + dx, y: state.pos.y};
  if (!collides(state.grid, state.current, pos, state.cols, state.rows)) state.pos = pos;
}

export function rotateCurrent(state: GameState) {
  const rotated = rotate(state.current);
  const kicks = [0, -1, 1, -2, 2];
  for (const k of kicks) {
    const pos = { x: state.pos.x + k, y: state.pos.y };
    if (!collides(state.grid, rotated, pos, state.cols, state.rows)) {
      state.current = rotated;
      state.pos = pos;
      return;
    }
  }
}
