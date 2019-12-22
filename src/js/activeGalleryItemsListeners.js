import saveLastPosition from './saveLastPosition.js';
import renderGallery from './renderGallery.js';


export default function addListenersToActiveGalleryItems () {

	const activeFieldClass = 'gallery-nav__section--selected';
	const activeCycleClass = 'gallery-nav__item--selected';

	const selectedGalleryItems = document.querySelectorAll('.gallery-nav__item');

	selectedGalleryItems.forEach( function(i) {

		i.addEventListener('click', function(e) {
			e.preventDefault();

			const prev = document.getElementsByClassName(activeCycleClass)[0];

			if (this === prev) { return }
			if (prev) { prev.classList.remove(activeCycleClass) }
			this.classList.add(activeCycleClass);

			const activeGallery = document.getElementsByClassName(activeFieldClass)[0];
			const field = activeGallery.id;
			const cycle = this.dataset[field];

			renderGallery(field, cycle, 0, 'sk');
			saveLastPosition();
		})

	});
}
