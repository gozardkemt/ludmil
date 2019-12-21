import saveLastPosition from './saveLastPosition.js';
import {switchClass} from './helpers.js'


const galleryItemSelecClass = 'gallery__item--selected';
const activeDotClass = 'dot--active';

const galleryContent = document.querySelector('.gallery__content');
const dotsContainer = document.getElementsByClassName('dots-controls')[0];

export default function addListenersDotJump() {
	const allDots = dotsContainer.querySelectorAll('.dot');

	allDots.forEach( function(dot) {
		dot.addEventListener('click', function(e) {
			e.preventDefault();

			const activeDot = dotsContainer.getElementsByClassName(activeDotClass)[0];

			if (this === activeDot) { return }

			const previous = galleryContent.getElementsByClassName(galleryItemSelecClass)[0];
			const allGalleryItems = galleryContent.getElementsByClassName('gallery__item');
			const next = allGalleryItems.item(this.id);

			if (!next) { console.error('Nenašiel sa element s indexom ' + this.id); return }

			switchClass(previous, next, galleryItemSelecClass);
			switchClass(activeDot, this, activeDotClass);
			saveLastPosition();
		})
	})

}
