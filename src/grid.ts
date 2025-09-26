/**
 * Faut créer une grille vide qui va etre remplie de 0
 * @param rows le nombre de lignes
 * @param cols cest le nombre de colonnes
 */
export function createGrid(rows: number, cols: number): number[][] {
    return Array.from({ length: rows }, () => Array(cols).fill(0));
  }
  
 
  export function collides(
    grid: number[][],
    piece: number[][],
    pos: { x: number; y: number },
    cols: number,
    rows: number
  ): boolean {
    for (let y = 0; y < piece.length; y++) {
      for (let x = 0; x < piece[y].length; x++) {
        if (piece[y][x] !== 0) {
          const newX = pos.x + x;
          const newY = pos.y + y;
  
          if (
            newX < 0 || newX >= cols || //en dehors des bords horizontaux
            newY >= rows ||             //en dehors du bas
            (newY >= 0 && grid[newY][newX] !== 0) // ya collision avec une case déjà rempli
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }
  
 
  export function mergePiece(
    grid: number[][],
    piece: number[][],
    pos: { x: number; y: number }
  ) {
    piece.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          grid[pos.y + y][pos.x + x] = value;
        }
      });
    });
  }
  
  /**
   * Vérifie et supprime les lignes pleines.
   * @returns nombre de lignes supprimées
   */
  export function clearLines(grid: number[][], cols: number): number {
    let linesCleared = 0;
  
    outer: for (let y = grid.length - 1; y >= 0; y--) {
      for (let x = 0; x < cols; x++) {
        if (grid[y][x] === 0) {
          continue outer; // ligne incomplète → on passe
        }
      }
  
      // ligne pleine → on la supprime
      grid.splice(y, 1);
      grid.unshift(Array(cols).fill(0));
      linesCleared++;
      y++;
    }
  
    return linesCleared;
  }
  