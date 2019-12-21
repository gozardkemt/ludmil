import saveLastPosition from './saveLastPosition.js';
import {underLayoutBreakpoint, switchClass} from './helpers.js'

export default function addListenersToFieldNavigation () {

	const fieldNavSelecClass = 'field-nav--selected';
	const galleryNavSecSelecClass = 'gallery-nav__section--selected';
	const fieldNav = document.getElementsByClassName('field-nav__container')[0];
	const fieldNavItems = fieldNav.querySelectorAll('.field-nav__item');
	const galleryNav = document.getElementsByClassName('gallery-navigation')[0];

	fieldNavItems.forEach( function(i) {

		i.addEventListener('click', function(e) {
			e.preventDefault();
			const previous = fieldNav.getElementsByClassName(fieldNavSelecClass)[0];
			const selectedGalleryNav = galleryNav.getElementsByClassName(galleryNavSecSelecClass)[0];
			const selectedNav = document.getElementById(this.dataset.field);

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

			// renderGallery(field,x, 0);
			saveLastPosition();
		})
	});
}
