import {savePosition} from './handleLocalStorage.js';
import renderGallery from './renderGallery.js';
import {underLayoutBreakpoint, switchClass} from './helpers.js'

export default function addListenersToFieldNavigation (data) {

	const fieldNavSelecClass = 'field-nav--selected';
	const galleryNavSecSelecClass = 'gallery-nav__section--selected';
	const activeCycleClass = 'gallery-nav__item--selected';

	const fieldNav = document.getElementsByClassName('field-nav__container')[0];
	const fieldNavItems = fieldNav.querySelectorAll('.field-nav__item');
	const galleryNav = document.getElementsByClassName('gallery-navigation')[0];

	fieldNavItems.forEach( function(i) {

		i.addEventListener('click', function(e) {
			e.preventDefault();

			const previous = fieldNav.getElementsByClassName(fieldNavSelecClass)[0];
			const selectedGalleryNav = galleryNav.getElementsByClassName(galleryNavSecSelecClass)[0];
			const field = this.dataset.field;
			const selectedNav = document.getElementById(field);

			if (selectedGalleryNav === undefined) {
				selectedNav.classList.add(galleryNavSecSelecClass); return;
			}

			switchClass(previous, this, fieldNavSelecClass);

			if (underLayoutBreakpoint()) {
				// phones a ipads
				if (this === previous) {
					selectedGalleryNav.classList.toggle(galleryNavSecSelecClass);
				} else {
					switchClass(selectedGalleryNav, selectedNav, galleryNavSecSelecClass);
				}
			} else {
				// pc
				if (this === previous) { return }
				switchClass(selectedGalleryNav, selectedNav, galleryNavSecSelecClass);
			}

			// handle the display of allways first cycle in new opened field nav
			const prevCycle = selectedGalleryNav.getElementsByClassName(activeCycleClass)[0];
			const firstCycle = selectedNav.getElementsByClassName('gallery-nav__item')[0];
			switchClass(prevCycle, firstCycle, activeCycleClass);

			renderGallery(field, firstCycle.dataset[field], 0, data, 'sk');
			savePosition(field, firstCycle.dataset[field]);
		})
	});
}
