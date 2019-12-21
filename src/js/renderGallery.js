import {data} from './data.js';
import {clearLocalStorage} from './handleLocalStorage.js';
import addListenersDotJump from './addListenersDotJump.js';

// website spesific constants

const galleryItemSelecClass = 'gallery__item--selected';
const activeDotClass = 'dot--active';

// DOM elements

const galleryContent = document.querySelector('.gallery__content');
const galleryContentList = galleryContent.querySelector('.gallery__list');
const dotsContainer = document.getElementsByClassName('dots-controls')[0];


export default function renderGallery(field, cycle, foto) {

	const fotos = data['sk'][field][cycle].fotos;

	if (!fotos) {
		galleryContentList.innerHTML = createErrorContent(cycle);
		dotsContainer.innerHTML = null;
		return;
	}

	galleryContentList.innerHTML = createGalleryContent(field, cycle, fotos, foto);
	dotsContainer.innerHTML = createNewDots(fotos, foto);

	addListenersDotJump();
	clearLocalStorage();
}

function createGalleryContent(field, item, fotos, foto) {

	return fotos.reduce( (a, f, i) =>

		a + `<li class="gallery__item ${insertSelectedClass(i, foto, galleryItemSelecClass)}">
				<figure class="gallery__figure">
			  		<img class="gallery__image" src="src/img/${field}/${item}/${i}.jpg" alt="${item}_foto">
			  		<figcaption class="gallery__caption">${f}</figcaption>
				</figure>
			</li>`
	, '');
}

function createErrorContent(cycle = 'Nepoznám') {
	return 	`<li class="gallery__item ${galleryItemSelecClass}">
				<figure class="gallery__figure">
				  <img class="gallery__image" alt="${cycle}_foto">
				  <figcaption class="gallery__caption">Obrázok nenájdený</figcaption>
				</figure>
			</li>`;
}

function createNewDots(fotos, foto) {
	return fotos.reduce( (a, f, i) => a + `<span id="${i}" class="dot ${insertSelectedClass(i, foto, activeDotClass)}">·</span>`,'');
}

const insertSelectedClass = (i, a, className) => { return i === a ? className : '' };
