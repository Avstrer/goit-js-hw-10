// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

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
const button = document.querySelector('data-start');
console.log(button);

const currentData = Date.now();
console.log(currentData);

const flatInput = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    userSelectedDate = selectedDates[0];
    if (userSelectedDate.getTime() < currentData) {
      alert('Please choose a date in the future');
    }
    console.log(userSelectedDate.getTime());
  },
});
// console.log(userSelectedDate);

// console.log(currentData);

// const clientData = new Date('03 24 2003');
// console.log(clientData.getTime());

// const value = currentData - clientData;
// console.log(value);
// console.log(convertMs(value));
