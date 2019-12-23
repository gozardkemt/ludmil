import renderGallery from './renderGallery.js';
import addListenersToGalleryJumpers from './jumper.js';
import addListenersToActiveGalleryItems from './activeGalleryItemsListeners.js';
import addListenersToFieldNavigation from './fieldNavListeners.js';
import addListenersDotJump from './addListenersDotJump.js';
import addViewpoerListeners from './viewport.js'
import {clearLocalStorage, getFromStorage} from './handleLocalStorage.js';
import {underLayoutBreakpoint} from './helpers.js';
import {fetchData} from './fetchData.js';

export default async function startSite() {

	const defaultField = 'paint';
	const defaultCycle = 'transfig';
	const defaultLang = 'sk';

	// testing if there is saved last position from previous session
	const field = getFromStorage('activeField') || defaultField;
	const cycle = getFromStorage('activeCycle') || defaultCycle;
	const foto = parseInt(getFromStorage('activeFoto')) || 0;

	const data = await fetchData('http://127.0.0.1:8080/src/js/data.json');

	// either way clearing the localStorage after extraction
	clearLocalStorage();

	// adding default classes for selected field menu, gallery navigation and gallery item
	setInitialSelectedClasses(field, cycle);

	// render gallery content
	renderGallery(field, cycle, foto, data, defaultLang);

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
