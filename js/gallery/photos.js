import { downloadPhoto } from '../server/api.js';
import { convertToSlugs } from '../utils/utils.js';
import { renderModal } from './modal.js';

const container = document.querySelector('.gallery__list');
const template = document.querySelector('#photo').content.querySelector('.gallery__item');
const fragment = document.createDocumentFragment();

const createPhoto = (photo) => {
  const filename = `${convertToSlugs(photo.user.name)}-${photo.user.id}-unsplash`;
  const newPhoto = template.cloneNode(true);
  const img = newPhoto.querySelector('.gallery__image');
  img.src = photo.urls.regular;
  img.alt = photo.alt_description;
  newPhoto.querySelector('.gallery__contributor-name').textContent = photo.user.name;
  newPhoto.querySelector('.gallery__contributor-img').src = photo.user.profile_image.medium;
  newPhoto.querySelector('.gallery__button-download').addEventListener('click', () => {
    downloadPhoto(photo.urls.full, filename);
  });
  newPhoto.addEventListener('click', (evt) => {
    evt.preventDefault();
    renderModal(photo);
  })
  fragment.append(newPhoto);
};

const renderPhotos = (data) => {
  const photos = data.results;
  photos.forEach((photo) => createPhoto(photo));
  container.append(fragment);
};

export { renderPhotos };