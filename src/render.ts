import { Matrix } from './tetromino';

const COLORS = [
  '#000000',
  '#00f0f0', '#0000f0', '#f0a000', '#f0f000',
  '#00f000', '#a000f0', '#f00000'
];

export function drawCell(ctx: CanvasRenderingContext2D, x:number, y:number, size:number, colorIndex:number) {
  ctx.fillStyle = COLORS[colorIndex];
  ctx.fillRect(x * size, y * size, size, size);
  ctx.strokeStyle = '#222';
  ctx.strokeRect(x * size, y * size, size, size);
}

export function drawGrid(ctx: CanvasRenderingContext2D, grid: Matrix, size:number) {
  ctx.fillStyle = '#111';
  ctx.fillRect(0,0,ctx.canvas.width, ctx.canvas.height);
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      drawCell(ctx, c, r, size, grid[r][c]);
    }
  }
}

export function drawPiece(ctx: CanvasRenderingContext2D, piece: Matrix, pos:{x:number,y:number}, size:number) {
  for (let r = 0; r < piece.length; r++) {
    for (let c = 0; c < piece[r].length; c++) {
      if (piece[r][c] !== 0) {
        const x = pos.x + c;
        const y = pos.y + r;
        if (y >= 0) drawCell(ctx, x, y, size, piece[r][c]);
      }
    }
  }
}
