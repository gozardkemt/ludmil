import {savePosition} from './handleLocalStorage.js';
import {switchClass, getInfoFromImg} from './helpers.js'
import showPage from './showPage.js';


const galleryItemSelecClass = 'gallery__item';
const activeDotClass = 'dot--active';

const galleryContent = document.querySelector('.gallery__content');
const dotsContainer = document.getElementsByClassName('dots-controls')[0];

export default function addListenersDotJump(data) {
	const allDots = dotsContainer.querySelectorAll('.dot');

	allDots.forEach( function(dot) {
		dot.addEventListener('click', function(e) {
			e.preventDefault();

			// testing if not clicking on the same element
			const activeDot = dotsContainer.getElementsByClassName(activeDotClass)[0];
			if (this === activeDot) { return }

			// getting number of img
			const activeItem = galleryContent.getElementsByClassName(galleryItemSelecClass)[0];
			const a = getInfoFromImg(activeItem);

			showPage(a.field, a.cycle, this.id, data, 'sk')
			switchClass(activeDot, this, activeDotClass);
			savePosition(a.field, a.cycle, this.id);
			
		})
	})

}
