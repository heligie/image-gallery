import { BASIC_URL, ACCESS_KEY } from '../utils/const.js';
import { showError, divideIntoDigitPlace, addNoScroll, removeNoScroll } from '../utils/utils.js';
import { downloadPhoto } from '../server/api.js';
import { convertToSlugs } from '../utils/utils.js';

const main = document.querySelector('.main');
const modalContainer = document.querySelector('.modal');
const modalCloseButton = document.querySelector('.modal__control');
const modalOverlay = document.querySelector('.modal__overlay');
const img = document.querySelector('.modal__image');
const avatar = document.querySelector('.modal__contributor-img');
const contributor = document.querySelector('.modal__contributor-name');
const views = document.querySelector('.count-views');
const likes = document.querySelector('.count-likes');
const downloads = document.querySelector('.count-downloads');
const downloadButton = document.querySelector('.modal__button-download');

let statistics;

const fillPopupInfo = (photo) => {
  const filename = `${convertToSlugs(photo.user.name)}-${photo.user.id}-unsplash`;
  img.src = photo.urls.regular;
  img.alt = photo.alt_description;
  contributor.textContent = photo.user.name;
  avatar.src = photo.user.profile_image.medium;
  downloadButton.addEventListener('click', () => {
    downloadPhoto(photo.urls.full, filename);
  });
  views.textContent = divideIntoDigitPlace(statistics.views.total);
  likes.textContent = divideIntoDigitPlace(statistics.likes.total);
  downloads.textContent = divideIntoDigitPlace(statistics.downloads.total);
};

const closeModal = () => {
  removeNoScroll();
  modalContainer.classList.remove('is-active');
  modalCloseButton.removeEventListener('click', modalCloseButtonClickHandler);
  modalOverlay.removeEventListener('click', modalOverlayClickHandler);
};

const openModal = () => {
  addNoScroll();
  modalContainer.classList.add('is-active');
  modalCloseButton.addEventListener('click', modalCloseButtonClickHandler);
  modalOverlay.addEventListener('click', modalOverlayClickHandler);
};

function modalCloseButtonClickHandler() {
  closeModal();
}

function modalOverlayClickHandler() {
  closeModal();
}

const renderModal = async (photo) => {
  try {
    const url = `${BASIC_URL}photos/${photo.id}/statistics?client_id=${ACCESS_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.status);
    }
    statistics = await response.json();
  } catch (error) {
    showError(error, main);
  }

  openModal();
  fillPopupInfo(photo);
};

export { renderModal };