// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

function convertMs(ms) {
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

let userSelectedDate;

const input = document.querySelector('#datetime-picker');
const button = document.querySelector('[data-start]');
const timerElement = document.querySelectorAll('.value');

button.setAttribute('disabled', 'true');

const flatInput = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    userSelectedDate = selectedDates[0];
    if (userSelectedDate.getTime() < Date.now()) {
      iziToast.error({
        title: 'Error!',
        messageColor: 'red',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      button.setAttribute('disabled', 'true');
    } else {
      input.setAttribute('disabled', 'true');
      button.removeAttribute('disabled');
    }
  },
});

button.addEventListener('click', timerFunctionListener);

function timerFunctionListener(event) {
  event.preventDefault();
  button.setAttribute('disabled', 'true');
  const interval = setInterval(() => {
    const different = userSelectedDate.getTime() - Date.now();

    const time = convertMs(different);
    timerElement[0].textContent = time.days.toString().padStart(2, '0');
    timerElement[1].textContent = time.hours.toString().padStart(2, '0');
    timerElement[2].textContent = time.minutes.toString().padStart(2, '0');
    timerElement[3].textContent = time.seconds.toString().padStart(2, '0');
    if (different < 1500) {
      clearInterval(interval);
      input.setAttribute('disabled', 'false');
    }
  }, 1000);
}
