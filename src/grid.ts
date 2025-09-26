import { Matrix } from './tetromino';

export function createGrid(rows: number, cols: number): Matrix {
  const g: Matrix = [];
  for (let r = 0; r < rows; r++) g.push(new Array(cols).fill(0));
  return g;
}

export function collides(grid: Matrix, piece: Matrix, pos: {x:number,y:number}, cols:number, rows:number): boolean {
  for (let r = 0; r < piece.length; r++) {
    for (let c = 0; c < piece[r].length; c++) {
      if (piece[r][c] !== 0) {
        const x = pos.x + c;
        const y = pos.y + r;
        if (x < 0 || x >= cols || y >= rows) return true;
        if (y >= 0 && grid[y][x] !== 0) return true;
      }
    }
  }
  return false;
}

export function mergePiece(grid: Matrix, piece: Matrix, pos: {x:number,y:number}) {
  for (let r = 0; r < piece.length; r++) {
    for (let c = 0; c < piece[r].length; c++) {
      if (piece[r][c] !== 0) {
        const x = pos.x + c;
        const y = pos.y + r;
        if (y >= 0 && y < grid.length && x >= 0 && x < grid[0].length) {
          grid[y][x] = piece[r][c];
        }
      }
    }
  }
}

// Supprime lignes complètes et retourne nombre
export function clearLines(grid: Matrix, cols:number): number {
  let cleared = 0;
  for (let r = grid.length - 1; r >= 0; r--) {
    let full = true;
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 0) { full = false; break; }
    }
    if (full) {
      grid.splice(r, 1);
      grid.unshift(new Array(cols).fill(0));
      cleared++;
      r++; // ré-évaluer la même ligne
    }
  }
  return cleared;
}
