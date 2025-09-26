export type Matrix = number[][];

export const TETROMINOS: Record<string, Matrix> = {
  I: [
    [0,0,0,0],
    [1,1,1,1],
    [0,0,0,0],
    [0,0,0,0]
  ],
  J: [
    [2,0,0],
    [2,2,2],
    [0,0,0]
  ],
  L: [
    [0,0,3],
    [3,3,3],
    [0,0,0]
  ],
  O: [
    [4,4],
    [4,4]
  ],
  S: [
    [0,5,5],
    [5,5,0],
    [0,0,0]
  ],
  T: [
    [0,6,0],
    [6,6,6],
    [0,0,0]
  ],
  Z: [
    [7,7,0],
    [0,7,7],
    [0,0,0]
  ]
};

export function cloneMatrix(m: Matrix): Matrix {
  return m.map(row => row.slice());
}


export function rotate(matrix: Matrix): Matrix {
  const N = matrix.length;
  const res: Matrix = Array.from({length: N}, () => new Array(N).fill(0));
  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      res[c][N - 1 - r] = matrix[r][c];
    }
  }
  return res;
}

export function randomTetromino(): { matrix: Matrix, type: string } {
  const types = Object.keys(TETROMINOS);
  const t = types[Math.floor(Math.random() * types.length)];
  return { matrix: cloneMatrix(TETROMINOS[t]), type: t };
}
