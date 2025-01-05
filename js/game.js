// about timer
const maxGage = document.querySelector(".max"); // 최대 게이지
const currentGage = document.querySelector(".cur"); // 현재 게이지
let time = 100; // 남은 시간

const score = document.querySelector(".score"); // 점수

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

document.addEventListener("DOMContentLoaded", () => {
  countDown();
});
