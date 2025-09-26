import type { Matrix } from "./tetromino";



export function drawGrid(ctx: CanvasRenderingContext2D, grid: Matrix, size: number) {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const id = grid[y][x];
      if (id !== 0) { 
        ctx.fillStyle = getColor(id);
        ctx.fillRect(x * size, y * size, size, size);
        ctx.strokeStyle = "black";
        ctx.strokeRect(x * size, y * size, size, size);
      }
    }
  }
}


export function drawPiece(
  ctx: CanvasRenderingContext2D,
  piece: Matrix,
  pos: { x: number; y: number },
  size: number
) {
  for (let y = 0; y < piece.length; y++) {
    for (let x = 0; x < piece[y].length; x++) {
      const id = piece[y][x];
      if (id !== 0) {
        ctx.fillStyle = getColor(id);
        ctx.fillRect((pos.x + x) * size, (pos.y + y) * size, size, size);
        ctx.strokeStyle = "black";
        ctx.strokeRect((pos.x + x) * size, (pos.y + y) * size, size, size);
      }
    }
  }
}


export function drawNext(next: Matrix, size: number) {
  const canvasNext = document.getElementById("next") as HTMLCanvasElement;
  const ctxNext = canvasNext.getContext("2d")!;
  canvasNext.width = 6 * size;
  canvasNext.height = 6 * size;

  ctxNext.clearRect(0, 0, canvasNext.width, canvasNext.height);

  for (let y = 0; y < next.length; y++) {
    for (let x = 0; x < next[y].length; x++) {
      const id = next[y][x];
      if (id !== 0) {
        ctxNext.fillStyle = getColor(id);
        ctxNext.fillRect(x * size, y * size, size, size);
        ctxNext.strokeStyle = "black";
        ctxNext.strokeRect(x * size, y * size, size, size);
      }
    }
  }
}


function getColor(id: number): string {
  const colors = [
    "cyan",    // I
    "blue",    // J
    "orange",  // L
    "yellow",  // O
    "green",   // S
    "purple",  // T
    "red"      // Z
  ];

  //ca renvoie "grey" si l'ID est invalide dcp
  return id > 0 && id <= colors.length ? colors[id - 1] : "grey";
}
