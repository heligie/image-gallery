import { divideIntoDigitPlace } from '../utils/utils.js';

const downloadsCount = document.querySelector('.gallery__stats-count--downloads');
const viewsCount = document.querySelector('.gallery__stats-count--views');
const developersCount = document.querySelector('.gallery__stats-count--developers');
const photosCount = document.querySelector('.gallery__stats-count--photos');
const photographersCount = document.querySelector('.gallery__stats-count--photographers');

const renderStats = (stats) => {
  const { downloads, views, new_developers, new_photos, new_photographers } = stats;

  downloadsCount.textContent = divideIntoDigitPlace(downloads);
  viewsCount.textContent = divideIntoDigitPlace(views);
  developersCount.textContent = divideIntoDigitPlace(new_developers);
  photosCount.textContent = divideIntoDigitPlace(new_photos);
  photographersCount.textContent = divideIntoDigitPlace(new_photographers);
};

export { renderStats };