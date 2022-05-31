export function renderMarkup(data) {
  const markup = data
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
    
        <a href="${largeImageURL}" class='link'
      ><div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" class="photo" data-source="${largeImageURL}"/>
        <div class="info">
          <div class="wrapper">
            <p class="info-item">
              <b>Likes</b>
            </p>
            <p class="info-item">${likes}</p>
          </div>
          <div class="wrapper">
            <p class="info-item">
              <b>Views</b>
            </p>
            <p class="info-item">${views}</p>
          </div>
          <div class="wrapper">
            <p class="info-item">
              <b>Comments</b>
            </p>
            <p class="info-item">${comments}</p>
          </div>
          <div class="wrapper">
            <p class="info-item">
              <b>Downloads</b>
            </p>
            <p class="info-item">${downloads}</p>
          </div>
        </div>
      </div>
    </a>
      `,
    )
    .join('');
  return markup;
}