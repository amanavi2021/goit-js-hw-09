
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');
let timerID = null;

stopBtn.disabled= true;

startBtn.addEventListener('click', () => {
    timerID = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
    },1000);

    startBtn.disabled =true;
    stopBtn.disabled= false;

});

stopBtn.addEventListener('click', () => {
    clearInterval(timerID);

    startBtn.disabled =false;
    stopBtn.disabled= true;
});

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
