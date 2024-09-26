import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImages } from './js/pixabay-api.js';

export const refs = {
  form: document.querySelector('.form'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
};

refs.form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const inputValue = form.elements.state.value.trim();
  

  refs.gallery.innerHTML = '';

  if (!inputValue) {
    iziToast.error({
      message: 'Please enter your request',
      position: 'bottomRight',
    });
    return;
  }

  refs.loader.style.display = 'inline-block';
  fetchImages(inputValue)
  .then(() => {
    refs.loader.style.display = 'none';
  })
  .catch(error => {
      refs.loader.style.display = 'none';
      iziToast.error({
        message: 'Error fetching images. Please try again later.',
        position: 'bottomRight',
      });
      console.error(error); 
    });

  refs.form.reset(); 
}
