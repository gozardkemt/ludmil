import {underLayoutBreakpoint} from './helpers.js'

export default function addViewpoerListeners() {

	// window.addEventListener('pageshow', function() { addGalleryNav() });
	window.addEventListener('resize', () => { addGalleryNav() });
	window.addEventListener('orientationchange', () => { addGalleryNav() });

	const addGalleryNav = () => {

		console.log('pracujem');
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
