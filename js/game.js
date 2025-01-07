// about timer
const maxGage = document.querySelector(".max");
const currentGage = document.querySelector(".cur");
let time = 100;

// about score
const score = document.querySelector(".score");
let curScore = 0;

// about canvas and tomato
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

// saved tomato positions
const tomatoes = [];

// timer count down function
function countDown() {
  setInterval(() => {
    currentGage.style.height = `${time}%`;
    time--;
    if (time === 0) {
      alert("Game Over! " + curScore + "점을 획득하셨습니다.");
      location.reload();
    }
  }, 1000);
}

// draw tomatoes
function drawTomatoes() {
  tomatoes.forEach(({ x, y, number }) => {
    const tomatoSize = 52;
    ctx.drawImage(tomato, x, y, tomatoSize, tomatoSize);

    const fontSize = 20 * (window.devicePixelRatio || 1);
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const numberX = x + tomatoSize / 2;
    const numberY = y + tomatoSize / 2;
    ctx.fillText(number, numberX, numberY);
  });
}

// initialize canvas
function drawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawTomatoes();
}

// initialize tomatoes
tomato.onload = () => {
  const canvasWidth = 800;
  const canvasHeight = 500;
  const margin = 8;

  canvas.width = canvasWidth * (window.devicePixelRatio || 1);
  canvas.height = canvasHeight * (window.devicePixelRatio || 1);
  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${canvasHeight}px`;
  ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);

  const tomatoSize = 52;
  const rows = Math.floor((canvasHeight - margin) / (tomatoSize + margin));
  const cols = Math.floor((canvasWidth - margin) / (tomatoSize + margin));
  let tomatoCount = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * (tomatoSize + margin) + margin;
      const y = row * (tomatoSize + margin) + margin;

      const randomNumber = Math.floor(Math.random() * 9) + 1; // 1~9
      tomatoes.push({ x, y, number: randomNumber });

      tomatoCount++;
      if (tomatoCount >= 120) break;
    }
    if (tomatoCount >= 120) break;
  }

  drawCanvas();
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

    drawCanvas();

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

  // Calculate the rectangle bounds
  const rectX = Math.min(startX, curX);
  const rectY = Math.min(startY, curY);
  const rectWidth = Math.abs(curX - startX);
  const rectHeight = Math.abs(curY - startY);

  // Filter tomatoes inside the drag box
  const insideTomatoes = tomatoes.filter(({ x, y }) => {
    const tomatoSize = 52;
    return (
      x >= rectX &&
      x + tomatoSize <= rectX + rectWidth &&
      y >= rectY &&
      y + tomatoSize <= rectY + rectHeight
    );
  });

  // Sum the numbers of tomatoes inside the drag box
  const sum = insideTomatoes.reduce((acc, { number }) => acc + number, 0);

  // If the sum is exactly 10, remove those tomatoes
  if (sum === 10) {
    // Remove the tomatoes that are inside the drag box
    const remainingTomatoes = tomatoes.filter(
      (tomato) => !insideTomatoes.includes(tomato)
    );

    // Update tomatoes and score
    curScore += insideTomatoes.length;
    score.textContent = curScore;

    tomatoes.length = 0;
    tomatoes.push(...remainingTomatoes);

    drawCanvas();
  }

  // Clear the selection box after mouse up
  drawCanvas();
});
