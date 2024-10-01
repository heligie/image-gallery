const downloads = document.querySelector('.gallery__stats-count--downloads');
const views = document.querySelector('.gallery__stats-count--views');
const developers = document.querySelector('.gallery__stats-count--developers');
const photos = document.querySelector('.gallery__stats-count--photos');
const photographers = document.querySelector('.gallery__stats-count--photographers');

const renderStats = (stats) => {
  downloads.textContent = stats.downloads;
  views.textContent = stats.views;
  developers.textContent = stats.new_developers;
  photos.textContent = stats.new_photos;
  photographers.textContent = stats.new_photographers;
};

export { renderStats };