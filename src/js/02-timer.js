import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

let finalTime=0;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose: onSelectDateClose,
  };

flatpickr('#datetime-picker', options);

// adds refs
const refs = {
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),

} 
refs.startBtn.disabled = true;

// adds class
class CountdownTimer {
  constructor({onChange}) {
    this.intevalId = null;
    this.isActive = false;
    this.onChange = onChange;
  }
  start() {
   
    if (this.isActive) {
      return;
    }

    this.isActive = true;

    this.intervalId = setInterval(() => {
      const deltaTime = finalTime - Date.now();
      if (deltaTime > 0) {
        const time = this.convertMs(deltaTime);
        this.onChange(time);

      } else {
        this.stop();
      }
        
    }, 1000)

   }
   stop() {
    clearInterval(this.intevalId);
    this.isActive = false;
   }

   convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

}

const countdownTimer = new CountdownTimer({
  onChange: updateTime
});

refs.startBtn.addEventListener('click', () => {
  countdownTimer.start();
});


// functions
function onSelectDateClose(selectedDates) {
  const delta = selectedDates[0].getTime() - Date.now();
  if (delta > 0) {
    finalTime = selectedDates[0].getTime();
    refs.startBtn.disabled = false;
  } else {
    Notiflix.Notify.failure("Please choose a date in the future");
  }
};

function addLeadingZero(value) {
  return String(value).padStart(2,'0');
};



function updateTime({days,hours, minutes, seconds}) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}
