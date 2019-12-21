import saveLastPosition from './saveLastPosition.js';
import {underLayoutBreakpoint, switchClass} from './helpers.js'


const galleryItemSelecClass = 'gallery__item--selected';
const activeDotClass = 'dot--active';

const galleryContent = document.querySelector('.gallery__content');
const allGalleryItems = galleryContent.getElementsByClassName('gallery__item');

const dotsContainer = document.getElementsByClassName('dots-controls')[0];

export default function addListenersToGalleryJumpers() {

	const jumper = document.querySelector('.gallery__jumper');
	const jumperNext = jumper.querySelector('.gallery__jumper--next');
	const jumperBack = jumper.querySelector('.gallery__jumper--back');

	jumperNext.addEventListener('click', () => { jumpContent('next') });
	jumperBack.addEventListener('click', () => { jumpContent('back') });

	window.addEventListener('keyup', (e) => {
		if (e.keyCode === 39) { jumpContent('next') }
		if (e.keyCode === 37) { jumpContent('back') }
	});
}

function jumpContent(dir) {

	// if viewport is small content do not use jumpers
	if (underLayoutBreakpoint()) { return }

	const thisContent = galleryContent.getElementsByClassName(galleryItemSelecClass)[0];
	let nextContent;

	if (dir === 'next') {
		nextContent = thisContent.nextElementSibling || allGalleryItems[0];
	}
	if (dir === 'back') {
		nextContent = thisContent.previousElementSibling || allGalleryItems[allGalleryItems.length - 1];
	}

	switchClass(thisContent, nextContent, galleryItemSelecClass);
	jumpDot(dir);
	saveLastPosition();
}

const jumpDot = (dir) => {

	const allDots = dotsContainer.querySelectorAll('.dot');
	const activeDot = dotsContainer.getElementsByClassName(activeDotClass)[0];
	let nextDot;

	if (dir === 'next') {
		nextDot = activeDot.nextElementSibling || allDots[0]
	}

	if (dir === 'back') {
		nextDot = activeDot.previousElementSibling || allDots[allDots.length - 1];
	}

	switchClass(activeDot, nextDot, activeDotClass);
}
