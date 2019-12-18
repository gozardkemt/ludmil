import '../css/style.css';
import {data} from './data.js';

// website spesific constants

const layoutBreakPoint = 900;
const fieldNavSelecClass = 'field-nav--selected';
const galleryNavSecSelecClass = 'gallery-nav__section--selected';
const galleryNavItemSelecClass = 'gallery-nav__item--selected';
const galleryItemSelecClass = 'gallery__item--selected';
const activeDotClass = 'dot--active';

// DOM elements

const doc = window.document;

const jumper = doc.querySelector('.gallery__jumper');
const jumperNext = jumper.querySelector('.gallery__jumper--next');
const jumperBack = jumper.querySelector('.gallery__jumper--back');

const fieldNav = doc.getElementsByClassName('field-nav__container')[0];
const fieldNavItems = fieldNav.querySelectorAll('.field-nav__item');

const galleryNav = doc.getElementsByClassName('gallery-navigation')[0];

const galleryContent = doc.querySelector('.gallery__content');
const galleryContentList = galleryContent.querySelector('.gallery__list');
const allGalleryItems = galleryContent.getElementsByClassName('gallery__item');

const dotsContainer = doc.getElementsByClassName('dots-controls')[0];
const allDots = dotsContainer.getElementsByClassName('dot');

 // variables

let viewportWidth = window.innerWidth;

 // viewport handlers

window.addEventListener('pageshow', function() { addGalleryNav() });
window.addEventListener('resize', function() { addGalleryNav() });
window.addEventListener('orientationchange', function() { addGalleryNav() });

const addGalleryNav = () => {
	const selected = galleryNav.getElementsByClassName(galleryNavSecSelecClass)[0];
	viewportWidth = window.innerWidth;

	if (layoutBreakPoint <= viewportWidth && selected === undefined) {
		doc.getElementById('paint').classList.add(galleryNavSecSelecClass);
		return;
	}
	if (layoutBreakPoint > viewportWidth) {
		selected.classList.remove(galleryNavSecSelecClass);
	}
}

 // Field Navigation

fieldNavItems.forEach( function(i) {

	i.addEventListener('click', function(e) {
		e.preventDefault();
		const previous = fieldNav.getElementsByClassName(fieldNavSelecClass)[0];
		const selectedGalleryNav = galleryNav.getElementsByClassName(galleryNavSecSelecClass)[0];
		const field = this.dataset.field;
		const selectedNav = doc.getElementById(field);

		if (selectedGalleryNav === undefined) {
			selectedNav.classList.add(galleryNavSecSelecClass); return;
		}

		previous.classList.remove(fieldNavSelecClass);
		this.classList.add(fieldNavSelecClass);

		viewportWidth = window.innerWidth;
		if (layoutBreakPoint > viewportWidth) {
			// phones a ipads
			if (this === previous) {
				selectedGalleryNav.classList.toggle(galleryNavSecSelecClass);
			} else {
				selectedGalleryNav.classList.remove(galleryNavSecSelecClass);
				selectedNav.classList.add(galleryNavSecSelecClass);
			}
		} else {
			// pc
			if (this === previous) { return }
			selectedGalleryNav.classList.remove(galleryNavSecSelecClass);
			selectedNav.classList.add(galleryNavSecSelecClass);
		}
	})
});

// Gallery Navigation

const selectedGalleryNav = doc.getElementsByClassName(galleryNavSecSelecClass)[0];
const selectedGalleryItems = selectedGalleryNav.querySelectorAll('.gallery-nav__item');

selectedGalleryItems.forEach( function(i) {

	i.addEventListener('click', function(e) {
		e.preventDefault();
		const previous = doc.getElementsByClassName(galleryNavItemSelecClass)[0];
		if (this === previous) { return }
		previous.classList.remove(galleryNavItemSelecClass);
		this.classList.add(galleryNavItemSelecClass);

		const activeGallerySection = selectedGalleryNav.id;
		const activeGalleryItem = this.dataset[activeGallerySection];

		openNewContent(activeGallerySection,activeGalleryItem)
	})

});

function openNewContent(field, item) {

	const fotos = data['sk'][field][item].fotos;

	if (fotos === undefined) {
		galleryContentList.innerHTML = createErrorContent(item);
		dotsContainer.innerHTML = '';
		return;
	}

	galleryContentList.innerHTML = createGalleryContent(field, item, fotos);
	dotsContainer.innerHTML = createNewDots(fotos);
}

function createNewDots(fotos) {
	return fotos.reduce( (a, f, i) => a + `<span class="dot ${inserActiveDotClass(i)}">·</span>`,'');
}

function createGalleryContent(field, item, fotos) {

	return fotos.reduce( (a, foto, i) =>

		a + `<li class="gallery__item ${inserSelectedClass(i)}">
				<figure class="gallery__figure">
			  		<img class="gallery__image" src="src/img/${field}/${item}/${i}.jpg" alt="${item}_foto">
			  		<figcaption class="gallery__caption">${foto}</figcaption>
				</figure>
			</li>`

	, '');
}

function createErrorContent(item) {
	return 	`<li class="gallery__item ${galleryItemSelecClass}">
				<figure class="gallery__figure">
				  <img class="gallery__image" alt="${item}_foto">
				  <figcaption class="gallery__caption">Obrázok nenájdený</figcaption>
				</figure>
			</li>`;
}

const inserActiveDotClass = (i) => {
	if (i === 0) {
		return activeDotClass;
	} else { return '';}
};

const inserSelectedClass = (i) => {
	if (i === 0) {
		return galleryItemSelecClass;
	} else { return '';}
};

// Gallery Content jumping

jumperNext.addEventListener('click', jumpNext);
jumperBack.addEventListener('click', jumpBack);
window.addEventListener('keyup', (e) => {
	if (e.keyCode === 39) { jumpNext() }
	if (e.keyCode === 37) { jumpBack() }
});

function jumpNext() {
	const thisFoto = galleryContent.getElementsByClassName(galleryItemSelecClass)[0];
	const nextFoto = thisFoto.nextElementSibling || allGalleryItems[0];

	thisFoto.classList.remove(galleryItemSelecClass);
	nextFoto.classList.add(galleryItemSelecClass);
	jumpDotNext();
}

function jumpBack() {
	const thisFoto = galleryContent.getElementsByClassName(galleryItemSelecClass)[0];
	const previousFoto = thisFoto.previousElementSibling || allGalleryItems[allGalleryItems.length - 1];

	thisFoto.classList.remove(galleryItemSelecClass);
	previousFoto.classList.add(galleryItemSelecClass);
	jumpDotBack();
}

const jumpDotNext = () => {
	const activeDot = dotsContainer.getElementsByClassName(activeDotClass)[0];
	const nextDot = activeDot.nextElementSibling || allDots[0];

	activeDot.classList.remove(activeDotClass);
	nextDot.classList.add(activeDotClass);
}

const jumpDotBack = () => {
	const activeDot = dotsContainer.getElementsByClassName(activeDotClass)[0];
	const previousDot = activeDot.previousElementSibling || allDots[allDots.length - 1];

	activeDot.classList.remove(activeDotClass);
	previousDot.classList.add(activeDotClass);
}
