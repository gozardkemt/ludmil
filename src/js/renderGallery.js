import {clearLocalStorage} from './handleLocalStorage.js';
import addListenersDotJump from './addListenersDotJump.js';
import showPage from './showPage.js';

// website spesific constants

const galleryItemSelecClass = 'gallery__item--selected';
const activeDotClass = 'dot--active';

// DOM elements

const dotsContainer = document.getElementsByClassName('dots-controls')[0];
const galleryList = document.querySelector('.gallery__list');

export default function renderGallery(field, cycle, id, data, lang) {

	const fotosCaptions = data[lang][field][cycle].fotos || false;

	if (!fotosCaptions) {
		galleryList.innerHTML = createError(cycle);
		return;
	}
	const fotoCaption = fotosCaptions[id];
	showPage(field, cycle, id, data, lang);
	dotsContainer.innerHTML = createNewDots(fotosCaptions, id);

	addListenersDotJump(data);
	clearLocalStorage(field, cycle, id);
}

function createError(cycle = 'Nepoznám') {
	return 	`<li class="gallery__item ${galleryItemSelecClass}">
				<figure class="gallery__figure">
				  <img class="gallery__image" alt='${cycle}_img'>
				  <figcaption class="gallery__caption">Obrázok nenájdený</figcaption>
				</figure>
			</li>`;
}

function createNewDots(fotos, fileNum) {
	return fotos.reduce( (a, f, i) => a + `<span id="${i}" class="dot ${insertSelectedClass(i, fileNum, activeDotClass)}">·</span>`,'');
}

const insertSelectedClass = (i, a, className) => { return i === a ? className : '' };
