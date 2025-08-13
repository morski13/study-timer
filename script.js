let timer;
let timeLeft = 45 * 60; // 45 minuta u sekundama
let isRunning = false;
let isBreak = false;

const timerDisplay = document.getElementById('timer-display');
const statusDisplay = document.getElementById('status');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');

function updateDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  timerDisplay.textContent =
    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      timeLeft--;
      updateDisplay();
      if (timeLeft <= 0) {
        clearInterval(timer);
        isRunning = false;
        if (!isBreak) {
          statusDisplay.textContent = "Vreme je za PAUZU!";
          timeLeft = 10 * 60; // 10 minuta pauze
          isBreak = true;
        } else {
          statusDisplay.textContent = "Nazad na UČENJE!";
          timeLeft = 45 * 60;
          isBreak = false;
        }
        startTimer();
      }
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  timeLeft = 45 * 60;
  isBreak = false;
  statusDisplay.textContent = "Spreman za početak";
  updateDisplay();
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

updateDisplay();

