export type Matrix = number[][];

export type Tetromino = {
  matrix: Matrix;
  color: string;
  type: string; 
};


const TETROMINOS: Tetromino[] = [
  { type: "I", matrix: [[1, 1, 1, 1]], color: "cyan" },
  { type: "J", matrix: [[1, 0, 0], [1, 1, 1]], color: "blue" },
  { type: "L", matrix: [[0, 0, 1], [1, 1, 1]], color: "orange" },
  { type: "O", matrix: [[1, 1], [1, 1]], color: "yellow" },
  { type: "S", matrix: [[0, 1, 1], [1, 1, 0]], color: "green" },
  { type: "T", matrix: [[0, 1, 0], [1, 1, 1]], color: "purple" },
  { type: "Z", matrix: [[1, 1, 0], [0, 1, 1]], color: "red" }
];


export function randomTetromino(): Tetromino {
  const index = Math.floor(Math.random() * TETROMINOS.length);
  return JSON.parse(JSON.stringify(TETROMINOS[index]));
}


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
