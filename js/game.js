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
tomato.src = "img/tomato.png";

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
  const canvasHeight = 500; // 캔버스의 세로 크기
  const margin = 8; // 토마토 사이의 간격

  // 캔버스 크기 설정
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  const tomatoSize = 52; // 토마토 크기 (52px)
  const rows = Math.floor((canvasHeight - margin) / (tomatoSize + margin)); // 세로로 배치 가능한 행 수
  const cols = Math.floor((canvasWidth - margin) / (tomatoSize + margin)); // 가로로 배치 가능한 열 수

  const devicePixelRatio = window.devicePixelRatio || 1;
  canvas.width = canvasWidth * devicePixelRatio;
  canvas.height = canvasHeight * devicePixelRatio;
  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${canvasHeight}px`;

  ctx.scale(devicePixelRatio, devicePixelRatio);
  ctx.imageSmoothingEnabled = true;

  // 토마토 그리기 및 랜덤 숫자 넣기
  let tomatoCount = 0; // 그린 토마토 개수

  // 폰트 크기 설정 (디스플레이에 맞게 고정)
  const fontSize = 20 * devicePixelRatio; // 글자 크기 (디바이스 해상도에 맞게 설정)
  ctx.font = `${fontSize}px Arial`;
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * (tomatoSize + margin) + margin;
      const y = row * (tomatoSize + margin) + margin;

      // 토마토 이미지 그리기
      ctx.drawImage(tomato, x, y, tomatoSize, tomatoSize);

      // 1~9까지 랜덤 숫자 생성
      const randomNumber = Math.floor(Math.random() * 9) + 1;

      // 숫자 위치 계산 (토마토의 중앙에 위치)
      const numberX = x + tomatoSize / 2;
      const numberY = y + tomatoSize / 2;

      // 숫자 그리기
      ctx.fillText(randomNumber, numberX, numberY);

      // 그린 토마토 개수 증가
      tomatoCount++;

      // 120개를 다 그리면 종료
      if (tomatoCount >= 120) {
        return; // 최대 토마토 개수를 그리면 종료
      }
    }
  }

  // 만약 120개가 덜 그려졌다면, 추가로 그리기
  if (tomatoCount < 120) {
    for (let i = tomatoCount; i < 120; i++) {
      const randomRow = Math.floor(Math.random() * rows);
      const randomCol = Math.floor(Math.random() * cols);

      const x = randomCol * (tomatoSize + margin) + margin;
      const y = randomRow * (tomatoSize + margin) + margin;

      // 토마토 이미지 그리기
      ctx.drawImage(tomato, x, y, tomatoSize, tomatoSize);

      // 1~9까지 랜덤 숫자 생성
      const randomNumber = Math.floor(Math.random() * 9) + 1;

      // 숫자 위치 계산 (토마토의 중앙에 위치)
      const numberX = x + tomatoSize / 2;
      const numberY = y + tomatoSize / 2;

      // 숫자 그리기
      ctx.fillText(randomNumber, numberX, numberY);
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  countDown();
});
