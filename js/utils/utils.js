import { DELAY } from './const.js';

const body = document.body;

const convertToSlugs = (string) => string.toLowerCase().replace(' ', '-');

const divideIntoDigitPlace = (digit) => digit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const showError = (error, container) => {
  document.querySelector('.error__status').textContent = error.message;
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