import { initGame, softDrop, hardDrop, move, rotateCurrent } from "./game";
import { drawGrid, drawPiece, drawNext } from "./render";

const canvas = document.getElementById("tetris") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

const BLOCK_SIZE = 30;


const ROWS = 20;
const COLS = 10;


let state = initGame(ROWS, COLS);

let lastTime = 0;
let dropCounter = 0;


function update(time = 0) {
  const deltaTime = time - lastTime;
  lastTime = time;

  if (!state.paused && !state.gameOver) {
    dropCounter += deltaTime;
    if (dropCounter > state.dropInterval) {
      softDrop(state);
      dropCounter = 0;
    }
  }

  draw();

  requestAnimationFrame(update);
}


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  drawGrid(ctx, state.grid, BLOCK_SIZE);
  drawPiece(ctx, state.currentPiece, state.position, BLOCK_SIZE);

  drawNext(state.nextPiece, BLOCK_SIZE);

  const scoreEl = document.getElementById("score")!;
  const linesEl = document.getElementById("lines")!;
  const levelEl = document.getElementById("level")!;
  scoreEl.textContent = state.score.toString();
  linesEl.textContent = state.linesCleared.toString();
  levelEl.textContent = state.level.toString();

  if (state.gameOver) {
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillRect(0, canvas.height / 2 - 40, canvas.width, 80);

    ctx.fillStyle = "white";
    ctx.font = "28px Arial";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
  }
}


document.addEventListener("keydown", (event) => {
  if (state.gameOver) return;

  switch (event.key) {
    case "ArrowLeft":
      move(state, -1);
      break;
    case "ArrowRight":
      move(state, 1);
      break;
    case "ArrowDown":
      softDrop(state);
      dropCounter = 0;
      break;
    case " ":
      hardDrop(state);
      dropCounter = 0;
      break;
    case "ArrowUp":
      rotateCurrent(state);
      break;
    case "p":
    case "P":
      state.paused = !state.paused;
      break;
  }
});


document.getElementById("restart")?.addEventListener("click", () => {
  state = initGame(ROWS, COLS);
});

// On peut démarrer le game

canvas.width = COLS * BLOCK_SIZE;
canvas.height = ROWS * BLOCK_SIZE;
update();
