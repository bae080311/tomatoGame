// about timer
const maxGage = document.querySelector(".max"); // max gage
const currentGage = document.querySelector(".cur"); // current gage
let time = 100; // left time

// about score
const score = document.querySelector(".score");
let CurScore = 0;

// about add tomato
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const tomato = new Image();
tomato.src = "img/tomato.png";

// about drag and drop
let drag = false;

let startX = 0;
let startY = 0;

let curX = 0;
let curY = 0;

// timer count down function
function countDown() {
  setInterval(() => {
    currentGage.style.height = `${time}%`;
    time--;
    if (time === 0) {
      alert("Game Over!");
      location.reload();
    }
  }, 1000);
}

// draw tomatoes function
function drawTomatoes() {
  const margin = 8;
  const tomatoSize = 52;
  const rows = Math.floor((canvas.height / (window.devicePixelRatio || 1) - margin) / (tomatoSize + margin));
  const cols = Math.floor((canvas.width / (window.devicePixelRatio || 1) - margin) / (tomatoSize + margin));

  let tomatoCount = 0;
  const fontSize = 20 * (window.devicePixelRatio || 1);
  ctx.font = `${fontSize}px Arial`;
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * (tomatoSize + margin) + margin;
      const y = row * (tomatoSize + margin) + margin;

      ctx.drawImage(tomato, x, y, tomatoSize, tomatoSize);

      const randomNumber = Math.floor(Math.random() * 9) + 1;
      const numberX = x + tomatoSize / 2;
      const numberY = y + tomatoSize / 2;

      ctx.fillText(randomNumber, numberX, numberY);
      tomatoCount++;

      if (tomatoCount >= 120) {
        return;
      }
    }
  }
}

// canvas and tomatoes setup
tomato.onload = () => {
  const canvasWidth = 800;
  const canvasHeight = 500;

  // set canvas size
  const devicePixelRatio = window.devicePixelRatio || 1;
  canvas.width = canvasWidth * devicePixelRatio;
  canvas.height = canvasHeight * devicePixelRatio;
  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${canvasHeight}px`;

  ctx.scale(devicePixelRatio, devicePixelRatio);
  ctx.imageSmoothingEnabled = true;

  // draw tomatoes
  drawTomatoes();
};

// start count
document.addEventListener("DOMContentLoaded", () => {
  countDown();
});

// drag start event
canvas.addEventListener("mousedown", (e) => {
  drag = true;
  const rect = canvas.getBoundingClientRect();
  startX = e.clientX - rect.left;
  startY = e.clientY - rect.top;
});

// dragging event
canvas.addEventListener("mousemove", (e) => {
  if (drag) {
    const rect = canvas.getBoundingClientRect();
    curX = e.clientX - rect.left;
    curY = e.clientY - rect.top;

    // clear canvas and redraw tomatoes
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTomatoes();

    // draw drag rectangle
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.strokeRect(
      Math.min(startX, curX),
      Math.min(startY, curY),
      Math.abs(curX - startX),
      Math.abs(curY - startY)
    );
  }
});

// drag end event
canvas.addEventListener("mouseup", () => {
  drag = false;
});
