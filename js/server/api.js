const downloadPhoto = (url, filename) => {
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const anchor = document.createElement('a');
      anchor.href = URL.createObjectURL(blob);
      anchor.download = filename;
      anchor.click();
      URL.revokeObjectURL(anchor.href);
    })
    .catch(() => alert('An error occurred while downloading the file'));
};

export { downloadPhoto };
