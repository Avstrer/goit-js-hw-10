// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const submitForm = document.querySelector('.form');
const elements = submitForm.elements;

submitForm.addEventListener('submit', submitFormFunction);

function submitFormFunction(event) {
  event.preventDefault();

  const delay = elements.delay.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (elements.state.value == 'fulfilled') {
        resolve(delay);
        console.log(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(delay);
        console.log(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });

  promise
    .then(delay =>
      iziToast.show({
        messageColor: 'green',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      })
    )
    .catch(delay =>
      iziToast.error({
        messageColor: 'red',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
      })
    );
}
