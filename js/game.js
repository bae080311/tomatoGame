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
  const canvasWidth = 800; // 캔버스의 가로 크기
  const canvasHeight = 600; // 캔버스의 세로 크기
  const rows = 10; // 세로 행
  const cols = 12; // 가로 열
  const margin = 5; // 토마토 사이의 간격

  // 캔버스 크기 설정
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  const tomatoAspectRatio = tomato.width / tomato.height; // 원본 이미지 비율
  const cellWidth = (canvasWidth - (cols + 1) * margin) / cols; // 각 셀의 너비
  const cellHeight = (canvasHeight - (rows + 1) * margin) / rows; // 각 셀의 높이

  // 이미지가 비율에 맞게 들어가도록 크기 계산
  const cellSize = Math.min(cellWidth, cellHeight);
  const width = cellSize; // 각 토마토의 너비
  const height = width / tomatoAspectRatio; // 높이는 비율에 맞게 계산

  const devicePixelRatio = window.devicePixelRatio || 1;
  canvas.width = canvasWidth * devicePixelRatio;
  canvas.height = canvasHeight * devicePixelRatio;
  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${canvasHeight}px`;

  ctx.scale(devicePixelRatio, devicePixelRatio);
  ctx.imageSmoothingEnabled = true;

  // 토마토 그리기 및 랜덤 숫자 넣기
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * (cellSize + margin) + margin;
      const y = row * (cellSize + margin) + margin;

      // 토마토 이미지 그리기
      ctx.drawImage(tomato, x, y, width, height);

      // 1~9까지 랜덤 숫자 생성
      const randomNumber = Math.floor(Math.random() * 9) + 1;

      // 숫자 텍스트 설정
      const fontSize = 24;
      ctx.font = `${fontSize}px Arial`;
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // 숫자 위치 계산 (토마토의 중앙에 위치)
      const numberX = x + width / 2;
      const numberY = y + height / 2 + 8;

      // 숫자 그리기
      ctx.fillText(randomNumber, numberX, numberY);
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  countDown();
});
