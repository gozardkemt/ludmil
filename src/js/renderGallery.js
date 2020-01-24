import {clearLocalStorage} from './handleLocalStorage.js';
import addListenersDotJump from './addListenersDotJump.js';
import showPage from './showPage.js';

// website spesific constants

const activeDotClass = 'dot--active';

// DOM elements

const dotsContainer = document.getElementsByClassName('dots-controls')[0];
const galleryList = document.querySelector('.gallery__list');

export function renderGallery(field, cycle, id, data, lang) {

	const fotosCaptions = data[lang][field][cycle].fotos || false;

	if (!fotosCaptions) {
		galleryList.innerHTML = createError(cycle);
		dotsContainer.innerHTML = null;
		return;
	}

	showPage(field, cycle, id, data, lang);
	dotsContainer.innerHTML = createNewDots(fotosCaptions, id);

	addListenersDotJump(data);
	clearLocalStorage(field, cycle, id);
}

export function createError(err) {
	return 	`<li class="gallery__item">
				<figure class="gallery__figure">
				  <span> ${err}</span>
				</figure>
			</li>`;
}

function createNewDots(fotos, fileNum) {
	return fotos.reduce( (a, f, i) => a + `<span id="${i}" class="dot ${insertSelectedClass(i, fileNum, activeDotClass)}">·</span>`,'');
}

const insertSelectedClass = (i, a, className) => { return i === a ? className : '' };
