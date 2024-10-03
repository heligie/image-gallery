import { BASIC_URL, ACCESS_KEY, DEFAULT_REQUEST, DEFAULT_PAGE, PER_PAGE, DELAY } from '../utils/const.js';
import { isEnterKey, showError, addNoScroll, removeNoScroll } from '../utils/utils.js';
import { renderPhotos } from './photos.js';
import { renderRandomPhoto } from './random.js';
import { renderStats } from './stats.js';

const GET_STATS_URL = `${BASIC_URL}stats/month?client_id=${ACCESS_KEY}`;

const main = document.querySelector('.main');
const logo = document.querySelector('.header__logo');
const input = document.querySelector('.header__search-input');
const searchButton = document.querySelector('.header__search-button');
const resetButton = document.querySelector('.header__search-reset');
const reloadButton = document.querySelector('.error__reload');
const container = document.querySelector('.gallery__list');

let inputValue = '';
let currentPage = 1;
let fetchRandomURL;
let fetchDataURL;
let fetchMoreDataURL;
let stats = {};
let random = {};
let data = {};
let nextPageData = {};

const showLoadingState = () => main.classList.add('is-loading');
const hideLoadingState = () => main.classList.remove('is-loading');
const showMoreLoader = () => main.classList.add('is-loading-more');
const hideMoreLoader = () => main.classList.remove('is-loading-more');
const showInputResetButton = () => input.classList.add('is-full');
const hideInputResetButton = () => input.classList.remove('is-full');

const getStatsData = async () => {
  try {
    const responseStats = await fetch(GET_STATS_URL);
    if (!responseStats.ok) {
      throw new Error(responseStats.status);
    }
    stats = await responseStats.json();
  } catch (error) {
    showError(error, main);
  }

  renderStats(stats);
};

const getGalleryData = async () => {
  if (!inputValue) {
    fetchRandomURL = `${BASIC_URL}photos/random?query=${DEFAULT_REQUEST}&client_id=${ACCESS_KEY}`;
    fetchDataURL = `${BASIC_URL}search/photos?query=${DEFAULT_REQUEST}&page=${DEFAULT_PAGE}&per_page=${PER_PAGE}&client_id=${ACCESS_KEY}`;
  } else {
    fetchRandomURL = `${BASIC_URL}photos/random?query=${inputValue}&client_id=${ACCESS_KEY}`;
    fetchDataURL = `${BASIC_URL}search/photos?query=${inputValue}&page=${DEFAULT_PAGE}&per_page=${PER_PAGE}&client_id=${ACCESS_KEY}`;
  }

  try {
    const responseRandom = await fetch(fetchRandomURL);
    if (!responseRandom.ok) {
      throw new Error(responseRandom.status);
    }
    random = await responseRandom.json();

    const responseData = await fetch(fetchDataURL);
    if (!responseData.ok) {
      throw new Error(responseData.status);
    }
    data = await responseData.json();
  } catch (error) {
    showError(error, main);
  }

  renderRandomPhoto(random);
  renderPhotos(data);
  setTimeout(() => hideLoadingState(), DELAY);
};

const loadMoreData = async () => {
  addNoScroll();

  currentPage++;
  fetchMoreDataURL = '';
  nextPageData = {};

  if (currentPage > data.total_pages) {
    hideMoreLoader();
    return;
  }

  if (!inputValue) {
    fetchMoreDataURL = `${BASIC_URL}search/photos?query=${DEFAULT_REQUEST}&page=${currentPage}&per_page=${PER_PAGE}&client_id=${ACCESS_KEY}`;
  } else {
    fetchMoreDataURL = `${BASIC_URL}search/photos?query=${inputValue}&page=${currentPage}&per_page=${PER_PAGE}&client_id=${ACCESS_KEY}`;
  }

  try {
    const responseMoreData = await fetch(fetchMoreDataURL);
    if (!responseMoreData.ok) {
      throw new Error(responseMoreData.status);
    }
    nextPageData = await responseMoreData.json();

    if (Object.keys(nextPageData).length) {
      hideMoreLoader();
      renderPhotos(nextPageData);
    }
  } catch (error) {
    removeNoScroll();
    nextPageData = {};
    showError(error, main);
  }

  removeNoScroll();
};

const loadNewData = () => {
  showLoadingState();
  resetLastGalleryValues();
  getGalleryData();
};

const resetLastGalleryValues = () => {
  main.classList.remove('is-error');
  container.innerHTML = '';
  fetchMoreDataURL = '';
  currentPage = 1;
  nextPageData = {};
};

const logoClickHandler = () => window.scrollTo({ top: 0, behavior: 'smooth' });

const inputKeyupHandler = (evt) => {
  evt.target.value ? showInputResetButton() : hideInputResetButton();
  inputValue = evt.target.value;

  if (isEnterKey(evt) && inputValue) {
    loadNewData();
  }
};

const searchButtonClickHandler = () => {
  if (inputValue) {
    loadNewData();
  }
};

const resetButtonClickHandler = () => {
  input.value = '';
  inputValue = '';
  hideInputResetButton();
};

const windowScrollHandler = () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  scrollTop > 0 ? logo.style.cursor = "pointer" : logo.style.cursor = "default";

  if (scrollTop + clientHeight >= scrollHeight) {
    showMoreLoader();
    loadMoreData();
  }
};

const reloadButtonClickHandler = () => window.location.reload();

const setEventHandlers = () => {
  logo.addEventListener('click', logoClickHandler);
  input.addEventListener('keyup', inputKeyupHandler);
  resetButton.addEventListener('click', resetButtonClickHandler);
  searchButton.addEventListener('click', searchButtonClickHandler);
  window.addEventListener('scroll', windowScrollHandler);
  reloadButton.addEventListener('click', reloadButtonClickHandler);
};

const initGallery = () => {
  getStatsData();
  getGalleryData();
  setEventHandlers();
};

export { initGallery };