const randomPhoto = document.querySelector('.gallery__random-image');
const contributor = document.querySelector('.gallery__random-contributor');

const renderRandomPhoto = (photo) => {
  randomPhoto.src = photo.urls.regular;
  randomPhoto.alt = photo.alt_description;
  contributor.textContent = photo.user.name;
};

export { renderRandomPhoto };