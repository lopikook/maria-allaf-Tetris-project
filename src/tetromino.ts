export type Matrix = number[][];

export type Tetromino = {
  matrix: Matrix;
  color: string;
  type: string; // nom de la pièce : I, J, L, O, S, T, Z
};

/**
 * Liste des différentes pièces Tetris.
 * Chaque pièce est une matrice (0 = vide, 1 = rempli).
 */
const TETROMINOS: Tetromino[] = [
  { type: "I", matrix: [[1, 1, 1, 1]], color: "cyan" },
  { type: "J", matrix: [[1, 0, 0], [1, 1, 1]], color: "blue" },
  { type: "L", matrix: [[0, 0, 1], [1, 1, 1]], color: "orange" },
  { type: "O", matrix: [[1, 1], [1, 1]], color: "yellow" },
  { type: "S", matrix: [[0, 1, 1], [1, 1, 0]], color: "green" },
  { type: "T", matrix: [[0, 1, 0], [1, 1, 1]], color: "purple" },
  { type: "Z", matrix: [[1, 1, 0], [0, 1, 1]], color: "red" }
];

/**
 * Renvoie une pièce aléatoire parmi la liste.
 */
export function randomTetromino(): Tetromino {
  const index = Math.floor(Math.random() * TETROMINOS.length);
  return JSON.parse(JSON.stringify(TETROMINOS[index])); // copie pour éviter les mutations
}

/**
 * Fait tourner une pièce (90° dans le sens horaire).
 */
export function rotate(matrix: Matrix): Matrix {
  const size = matrix.length;
  const rotated: Matrix = [];

  for (let x = 0; x < size; x++) {
    rotated[x] = [];
    for (let y = size - 1; y >= 0; y--) {
      rotated[x][size - 1 - y] = matrix[y][x];
    }
  }

  return rotated;
}
