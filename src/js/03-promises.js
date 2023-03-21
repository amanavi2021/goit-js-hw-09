import Notiflix from 'notiflix';

refs = {
  firstDelayField:document.querySelector('input[name="delay"]'),
  delayStepField:document.querySelector('input[name="step"]'),
  amountField: document.querySelector('input[name="amount"]'),
  createBtn: document.querySelector('button'),
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {

return new Promise((resolve, reject) => {
  const shouldResolve = Math.random() > 0.3;
  setTimeout(() => {
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }

  }, delay);

});  
};

function onFormSubmit(e) {
  e.preventDefault();
  let delay = Number(refs.firstDelayField.value);
  const step = Number(refs.delayStepField.value);
  const amount = Number(refs.amountField.value);
 
  for (let position=1; position<=amount; position+=1) {
  createPromise(position, delay)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
  })
  delay+=step;
  
  }
};
