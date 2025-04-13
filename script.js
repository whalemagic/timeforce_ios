let startTime, timerInterval;
let isRunning = false;
let lapCount = 0;
let forcedNumber = "123654";  // можно заменить из localStorage при необходимости

const timerDisplay = document.getElementById("timer");
const startStopBtn = document.getElementById("startStop");
const lapBtn = document.getElementById("lap");
const lapsList = document.getElementById("laps");

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  const milliseconds = Math.floor((ms % 1000) / 10).toString().padStart(2, "0");
  return `${minutes}:${seconds},${milliseconds}`;
}

function updateTimer() {
  const elapsed = Date.now() - startTime;
  timerDisplay.textContent = formatTime(elapsed);
}

startStopBtn.addEventListener("click", () => {
  if (!isRunning) {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 30);
    startStopBtn.textContent = "Стоп";
    startStopBtn.classList.remove("start");
    startStopBtn.classList.add("stop");
    lapBtn.disabled = false;
    isRunning = true;
  } else {
    clearInterval(timerInterval);
    startStopBtn.textContent = "Старт";
    startStopBtn.classList.remove("stop");
    startStopBtn.classList.add("start");
    lapBtn.disabled = true;
    isRunning = false;
  }
});

lapBtn.addEventListener("click", () => {
  const elapsed = Date.now() - startTime;
  lapCount++;
  const li = document.createElement("li");
  li.textContent = `Круг ${lapCount}`;
  const span = document.createElement("span");
  const str = forcedNumber.slice((lapCount - 1) * 2, lapCount * 2);
  span.textContent = str ? `00:00,${str}` : formatTime(elapsed);
  li.appendChild(span);
  lapsList.prepend(li);
});
