import { DELAY, DEFAULT_ERROR_MESSAGE, ERROR } from './const.js';

const body = document.body;

const convertToSlugs = (string) => string.toLowerCase().replace(' ', '-');

const divideIntoDigitPlace = (digit) => digit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const showError = (error, container) => {
  document.querySelector('.error__status').textContent = error.message || '';
  document.querySelector('.error__description').textContent = ERROR[error.message] || DEFAULT_ERROR_MESSAGE;
  setTimeout(() => container.classList.add('is-error'), DELAY);
};

const addNoScroll = () => body.classList.add('no-scroll');

const removeNoScroll = () => body.classList.remove('no-scroll');

export {
  convertToSlugs,
  divideIntoDigitPlace,
  showError,
  addNoScroll,
  removeNoScroll
};