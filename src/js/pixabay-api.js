import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { handleSuccess } from './render-functions.js';
import { refs } from '../main.js';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '46118726-f37cd2f98d2a6e2b7b3af8ac8';

export function fetchImages(value) {
  fetch(
    `${BASE_URL}?key=${API_KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true`
  )
    .then(response => response.json())
    .then(data => {
      refs.loader.style.display = 'none';

      if (data.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'bottomRight',
        });
        return;
      }
      const markup = handleSuccess(data.hits);
      refs.gallery.insertAdjacentHTML('beforeend', markup);

      const library = new SimpleLightbox('.gallery a', {
        captionDelay: 300,
        captionsData: 'alt',
      });

      library.refresh();
    })
    .catch(error => {
      refs.loader.style.display = 'none';
      console.log(error);
    });
}
