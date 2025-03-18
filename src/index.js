import "./styles.css";
import Pill from "./Pill";

// import { randomNumber, map } from "./utils";

const app = document.getElementById("app");
const canvas = document.createElement("canvas");
canvas.id = "cvs";
app.appendChild(canvas);

const ctx = canvas.getContext("2d");
let width = window.innerWidth;
let height = window.innerHeight;
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

// Pills speed
const min = 10;
const max = 100;

const pills = [];

for (let i = 0; i < 200; i++) {
  pills.push(new Pill(width, height, min, max));
}

ctx.fillStyle = "#fff"; //"#999";

// Display FPS
let fpsCount = 0,
  dispFps = 0;
const displayInfo = () => {
  fpsCount++;

  ctx.beginPath();
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fillRect(canvas.width - 80, 0, 100, 40);
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText(`${dispFps}`, canvas.width - 65, 32);
  ctx.closePath();
};

let fpsInterval;
const setFpsInterval = () => {
  if (fpsInterval) {
    clearInterval(fpsInterval);
  } else {
    fpsInterval = setInterval(() => {
      dispFps = fpsCount;
      fpsCount = 0;
    }, 1000);
  }
};

let then = 0;
function loop(now = 0) {
  let delta = now - then;
  then = now;

  if (delta > 100) delta = 100;

  if (
    ctx.canvas.width !== canvas.offsetWidth ||
    ctx.canvas.height !== canvas.offsetHeight
  ) {
    width = ctx.canvas.width = canvas.offsetWidth;
    height = ctx.canvas.height = canvas.offsetHeight;
    // note the above clears the canvas.
  } else {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  ctx.fillStyle = "#fff";

  pills.forEach((p, id) => p.update(delta, pills, ctx, id));
  pills.forEach((p) => p.display(ctx));
  displayInfo();
  requestAnimationFrame(loop);
}
loop();
setFpsInterval();
// (max - (Math.abs(item[2]) + Math.abs(item[3])))
