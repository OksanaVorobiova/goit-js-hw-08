import { galleryItems } from './gallery-items.js';
// Change code below this line
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
console.log(galleryItems);

const galleryEl = document.querySelector('.gallery');

const makeGalleryMarkup = (galleryItems) => {
    return galleryItems.map(({preview, original, description}) => {
        return `<div class='gallery__item'>
        <a class="gallery__link" href="${original}">
            <img 
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
            />
        </a>
        </div>`
    }).join("");
}

const galleryMarkup = makeGalleryMarkup(galleryItems);
console.log(galleryMarkup);

galleryEl.innerHTML = galleryMarkup;

galleryEl.addEventListener('click', onGalleryClick);


function onGalleryClick(e) {
    e.preventDefault();
    
    let gallery = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionsDelay: 250,
});

    gallery.on('shown.simplelightbox', () => {
        window.addEventListener('keydown', (event) => {
            if (event.code !== 'Escape') {
                return;
            }

            gallery.close();
        });
    });

    gallery.on('closed.simplelightbox', () => {
        window.removeEventListener('keydown', (event) => {
            if (event.code !== 'Escape') {
                return;
            }

            gallery.close();
        });
    });
}