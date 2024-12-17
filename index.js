let timer;
let running = false;
let startTime, updatedTime, difference;
let lapCounter = 1;
let savedTime = 0;

const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const laps = document.getElementById('laps');

function formatTime(ms) {
    const date = new Date(ms);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}

function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime() - savedTime;
        timer = setInterval(updateDisplay, 10);
        running = true;
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        resetBtn.disabled = false;
        lapBtn.disabled = false;
    }
}

function pauseStopwatch() {
    if (running) {
        clearInterval(timer);
        savedTime = new Date().getTime() - startTime;
        running = false;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
    }
}

function resetStopwatch() {
    clearInterval(timer);
    running = false;
    savedTime = 0;
    lapCounter = 1;
    display.textContent = '00:00:00';
    laps.innerHTML = '';
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
    lapBtn.disabled = true;
}

function updateDisplay() {
    updatedTime = new Date().getTime() - startTime;
    display.textContent = formatTime(updatedTime);
}

function recordLap() {
    const li = document.createElement('li');
    li.textContent = `Lap ${lapCounter++}: ${display.textContent}`;
    laps.appendChild(li);
}

startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);