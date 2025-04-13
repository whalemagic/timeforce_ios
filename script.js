
let startTime, timerInterval;
let isRunning = false;
let lapCount = 0;
let forcedNumber = localStorage.getItem("forceDefault") || "123654";
let isForcedMode = true; // по умолчанию включен режим форсирования

const timerDisplay = document.getElementById("timer");
const startStopBtn = document.getElementById("startStop");
const lapBtn = document.getElementById("lap");
const lapsList = document.getElementById("laps");

function getMsDigits() {
  return localStorage.getItem("msDigits") === "2" ? 2 : 3;
}

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  const milliseconds = Math.floor(ms % 1000).toString().padStart(3, "0").slice(0, getMsDigits());
  return `${minutes}:${seconds},${milliseconds}`;
}

function updateTimer() {
  const elapsed = Date.now() - startTime;
  timerDisplay.textContent = formatTime(elapsed);
}

function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  lapCount = 0;
  timerDisplay.textContent = "00:00,00";
  startStopBtn.textContent = "Старт";
  startStopBtn.classList.add("start");
  startStopBtn.classList.remove("stop");
  lapBtn.disabled = true;
  lapsList.innerHTML = "";
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

  if (isForcedMode) {
    const str = forcedNumber.slice((lapCount - 1) * 2, lapCount * 2);
    span.textContent = str ? `00:00,${str}` : formatTime(elapsed);
  } else {
    span.textContent = formatTime(elapsed);
  }

  li.appendChild(span);
  lapsList.prepend(li);
});

// Кнопка сброса
const resetBtn = document.createElement("button");
resetBtn.textContent = "Сброс";
resetBtn.className = "circle-button reset";
resetBtn.style.position = "absolute";
resetBtn.style.bottom = "20px";
resetBtn.style.right = "20px";
resetBtn.addEventListener("click", resetTimer);
document.body.appendChild(resetBtn);

// Переключение режима (двойной тап)
let lastTap = 0;
document.body.addEventListener("touchend", function(e) {
  const now = new Date().getTime();
  const touch = e.changedTouches[0];
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  if (touch.clientX > vw * 0.8 && touch.clientY > vh * 0.8) {
    if (now - lastTap < 400) {
      isForcedMode = !isForcedMode;
      alert("Режим " + (isForcedMode ? "Фокусника" : "Обычный"));
    }
    lastTap = now;
  }
});

// Длинное нажатие — открытие меню
let pressTimer;
document.body.addEventListener("touchstart", function(e) {
  const touch = e.touches[0];
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  if (touch.clientX > vw * 0.8 && touch.clientY > vh * 0.8) {
    pressTimer = setTimeout(() => {
      const s = document.getElementById("settingsPanel");
      if (s) s.style.display = "block";
    }, 600);
  }
});

document.body.addEventListener("touchend", function() {
  clearTimeout(pressTimer);
});
