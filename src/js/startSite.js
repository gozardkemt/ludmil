import {renderGallery, createError} from './renderGallery.js';
import addListenersToGalleryJumpers from './jumper.js';
import addListenersToActiveGalleryItems from './activeGalleryItemsListeners.js';
import addListenersToFieldNavigation from './fieldNavListeners.js';
import addListenersDotJump from './addListenersDotJump.js';
import addViewpoerListeners from './viewport.js'
import {clearLocalStorage, getFromStorage} from './handleLocalStorage.js';
import {underLayoutBreakpoint} from './helpers.js';

export default async function startSite() {

	const data = await fetchData('http://localhost:8081/src/js/data.json');

	// testing if there is saved last position from previous session, if not use default
	const field = getFromStorage('activeField') || 'paint';
	const cycle = getFromStorage('activeCycle') || 'transfig';
	const foto = parseInt(getFromStorage('activeFoto')) || 0;
	const lang = getFromStorage('activeLang') || 'sk';

	// either way clearing the localStorage after extraction
	clearLocalStorage();

	// adding default classes for selected field menu, gallery navigation and gallery item
	setInitialSelectedClasses(field, cycle);

	// render gallery content
	renderGallery(field, cycle, foto, data, lang);

	// attaching  event Listeners
	addListenersToGalleryJumpers(data);
	addListenersToActiveGalleryItems(data);
	addListenersToFieldNavigation(data);
	addListenersDotJump(data);

	// handle problem with gallery navigation desapearing
	addViewpoerListeners();
}

function setInitialSelectedClasses(field, cycle) {

	const fieldNavSelecClass = 'field-nav--selected';
	const galleryNavSecSelecClass = 'gallery-nav__section--selected';
	const galleryNavItemSelecClass = 'gallery-nav__item--selected';

	const fieldNav = document.getElementsByClassName('field-nav__container')[0];
	const selectedFieldMenu = fieldNav.querySelector(`[data-field='${field}']`);
	selectedFieldMenu.classList.add(fieldNavSelecClass);

	const galleryNav = document.getElementsByClassName('gallery-navigation')[0];
	const selectedGalleryItem =  galleryNav.querySelector(`[data-${field}='${cycle}']`)
	selectedGalleryItem.classList.add(galleryNavItemSelecClass);

	if (underLayoutBreakpoint()) { return }

	const selectedGalleryNav = document.getElementById(field)
	selectedGalleryNav.classList.add(galleryNavSecSelecClass);
}

export const fetchData = async (url) => {

  return await fetch(url)
	.then( d => {
		if ( d.status !== 200 ) {
			createNetworkError(d);
			throw Error(d.url);
		}
		return d.json();
	});
};

const createNetworkError = d => {
	const err = `Network error status: ${d.status} - ${d.statusText}`;
	document.querySelector('.gallery__list').innerHTML = createError(err)
}
