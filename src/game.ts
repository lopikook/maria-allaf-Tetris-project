import { createGrid, collides, mergePiece, clearLines } from './grid';
import { randomTetromino, rotate } from './tetromino';
import type { Matrix } from './tetromino';

/**
 * Représente l'état global d'une partie de Tetris.
 */
export type GameState = {
  grid: Matrix,                    // Grille du jeu
  currentPiece: Matrix,            // Pièce active
  nextPiece: Matrix,               // Prochaine pièce
  position: { x: number, y: number }, // Coordonnées de la pièce active
  cols: number, rows: number,      // Dimensions de la grille
  score: number,                   // Score actuel
  linesCleared: number,            // Nombre total de lignes supprimées
  level: number,                   // Niveau actuel
  dropInterval: number,            // Temps (ms) entre chaque descente automatique
  paused: boolean,                 // Pause du jeu
  gameOver: boolean                // Fin de partie
};

/**
 * Initialise une nouvelle partie.
 */
export function initGame(rows: number, cols: number): GameState {
  const grid = createGrid(rows, cols);
  const current = randomTetromino().matrix;
  const next = randomTetromino().matrix;
  const startPos = { x: Math.floor(cols / 2) - 1, y: -1 };

  return {
    grid,
    currentPiece: current,
    nextPiece: next,
    position: startPos,
    cols,
    rows,
    score: 0,
    linesCleared: 0,
    level: 1,
    dropInterval: 1000,
    paused: false,
    gameOver: false
  };
}

/**
 * Fait apparaître la prochaine pièce.
 */
export function spawnNext(state: GameState) {
  state.currentPiece = state.nextPiece;
  state.nextPiece = randomTetromino().matrix;
  state.position = { x: Math.floor(state.cols / 2) - 1, y: -1 };

  if (collides(state.grid, state.currentPiece, state.position, state.cols, state.rows)) {
    state.gameOver = true;
  }
}

/**
 * Met à jour le score et le niveau après une suppression de lignes.
 */
function updateScore(state: GameState, clearedLines: number) {
  state.linesCleared += clearedLines;
  state.score += clearedLines * 100 * state.level;

  const newLevel = Math.floor(state.linesCleared / 10) + 1;
  if (newLevel > state.level) {
    state.level = newLevel;
    state.dropInterval = Math.max(100, 1000 - (state.level - 1) * 100);
  }
}

/**
 * Descente douce : la pièce tombe d’une case.
 */
export function softDrop(state: GameState) {
  const newPos = { x: state.position.x, y: state.position.y + 1 };

  if (!collides(state.grid, state.currentPiece, newPos, state.cols, state.rows)) {
    state.position = newPos;
  } else {
    mergePiece(state.grid, state.currentPiece, state.position);
    const cleared = clearLines(state.grid, state.cols);
    if (cleared > 0) updateScore(state, cleared);
    spawnNext(state);
  }
}

/**
 * Descente rapide : la pièce tombe directement jusqu’au contact.
 */
export function hardDrop(state: GameState) {
  while (!collides(state.grid, state.currentPiece, { x: state.position.x, y: state.position.y + 1 }, state.cols, state.rows)) {
    state.position.y++;
  }

  mergePiece(state.grid, state.currentPiece, state.position);
  const cleared = clearLines(state.grid, state.cols);
  if (cleared > 0) updateScore(state, cleared);
  spawnNext(state);
}

/**
 * Déplace la pièce horizontalement.
 */
export function move(state: GameState, dx: number) {
  const newPos = { x: state.position.x + dx, y: state.position.y };
  if (!collides(state.grid, state.currentPiece, newPos, state.cols, state.rows)) {
    state.position = newPos;
  }
}

/**
 * Fait tourner la pièce actuelle, avec un système de "wall kicks".
 */
export function rotateCurrent(state: GameState) {
  const rotated = rotate(state.currentPiece);
  const kickOffsets = [0, -1, 1, -2, 2];

  for (const offset of kickOffsets) {
    const testPos = { x: state.position.x + offset, y: state.position.y };
    if (!collides(state.grid, rotated, testPos, state.cols, state.rows)) {
      state.currentPiece = rotated;
      state.position = testPos;
      return;
    }
  }
}
