import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { ApiService } from './js/аpi';
import { getRefs } from './js/getRef';
import { checkRequest } from './js/check-request';
import { renderMarkup } from './js/renderingMarkup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './style.css';

const { formRef, containerRef, btnRef } = getRefs();
const apiService = new ApiService();
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

btnRef.classList.add('is-hidden');

formRef.addEventListener('submit', e => {
  e.preventDefault();

  apiService.query = e.currentTarget.searchQuery.value.trim();
  if (apiService.query === '') {
    return;
  }
  clearGallery(containerRef, btnRef);
  apiService.resetPage();
  formRef.reset();

  axiosImg()
    .then(response => checkRequest(response))
    .then(response => {
      createGallery(response.hits);
      Notify.success(`Hooray! We found ${response.totalHits} totalHits images.`);
      btnRef.classList.remove('is-hidden');
    })
    .catch(() => {
      btnRef.classList.add('is-hidden');
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    });
});

btnRef.addEventListener('click', onClickLoadMoreBtn);

async function onClickLoadMoreBtn() {
  apiService.incrementPage();
  axiosImg()
    .then(response => checkRequest(response))
    .then(response => createGallery(response.hits))
    .catch(() => {
      btnRef.classList.add('is-hidden');
      Notify.info("We're sorry, but you've reached the end of search results.");
    });
}

function createGallery(response) {
  containerRef.insertAdjacentHTML('beforeend', renderMarkup(response));
  lightbox.refresh();
}

async function axiosImg() {
  const response = await apiService.axios().then();
  return response;
}

function clearGallery(refs) {
  refs.innerHTML = '';
}