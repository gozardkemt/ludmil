import {underLayoutBreakpoint} from './helpers.js'

export default function addViewpoerListeners() {

	// window.addEventListener('pageshow', function() { addGalleryNav() });
	window.addEventListener('resize', function() { addGalleryNav() });
	window.addEventListener('orientationchange', function() { addGalleryNav() });

	const addGalleryNav = () => {

		const galleryNavSecSelecClass = 'gallery-nav__section--selected';
		const galleryNav = document.getElementsByClassName('gallery-navigation')[0];
		const selected = galleryNav.getElementsByClassName(galleryNavSecSelecClass)[0];

		if (!underLayoutBreakpoint() && !selected) {
			document.getElementById('paint').classList.add(galleryNavSecSelecClass);
			return;
		}

		if (underLayoutBreakpoint()) {
			selected.classList.remove(galleryNavSecSelecClass);
		}
	}

}
