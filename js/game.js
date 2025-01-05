// about timer
const maxGage = document.querySelector(".max"); // 최대 게이지
const currentGage = document.querySelector(".cur"); // 현재 게이지
let time = 100; // 남은 시간

// about score
const score = document.querySelector(".score"); // 점수
let CurScore = 0; // 현재 점수

// about tomato
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const tomato = new Image();
tomato.src = "img/tomato2.png";

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

tomato.onload = () => {
  const rows = 10; // 세로 행
  const cols = 12; // 가로 열
  const margin = 5; // 토마토 사이의 간격

  // 토마토 이미지의 가로세로 비율을 계산
  const tomatoAspectRatio = tomato.width / tomato.height;

  // 원하는 크기 (아이콘 크기: 12x12)
  const width = 12; // 고정된 크기 (아이콘 크기)
  const height = width / tomatoAspectRatio; // 비율에 맞는 높이

  // canvas 해상도 조정 (디바이스 픽셀 비율 고려)
  const devicePixelRatio = window.devicePixelRatio || 1;
  canvas.width = cols * (width + margin) * devicePixelRatio;
  canvas.height = rows * (height + margin) * devicePixelRatio;

  ctx.scale(devicePixelRatio, devicePixelRatio);

  ctx.imageSmoothingEnabled = true;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * (width + margin);
      const y = row * (height + margin);

      // drop tomato
      ctx.drawImage(tomato, x, y, width, height);

      // random number
      const randomNumber = Math.floor(Math.random() * 9) + 1;

      // font styling
      const fontSize = 7;
      ctx.font = `${fontSize}px Arial`;
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // number location
      const numberX = x + width / 2;
      const numberY = y + height / 2 + 2;

      // draw number
      ctx.fillText(randomNumber, numberX, numberY);
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  countDown();
});
