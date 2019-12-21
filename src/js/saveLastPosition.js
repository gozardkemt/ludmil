import {clearLocalStorage, saveToStorage} from './handleLocalStorage.js';
import {underLayoutBreakpoint} from './helpers.js'

const galleryItemSelecClass = 'gallery__item--selected';
const galleryContent = document.querySelector('.gallery__content');
const galleryNav = document.getElementsByClassName('gallery-navigation')[0];
const galleryNavSecSelecClass = 'gallery-nav__section--selected';
const galleryNavItemSelecClass = 'gallery-nav__item--selected';

export default function saveLastPosition() {

	clearLocalStorage();

	const activeField = document.getElementsByClassName(galleryNavSecSelecClass)[0].id;
	const activeCycle = galleryNav.getElementsByClassName(galleryNavItemSelecClass)[0].dataset[activeField];

	saveToStorage('activeField', activeField);
	saveToStorage('activeCycle', activeCycle);

	// if we are on small screen we do not need foto position
	if (underLayoutBreakpoint()) { return }

	const activeLiElement = galleryContent.getElementsByClassName(galleryItemSelecClass)[0];
	const activeFotoElement = activeLiElement.children[0].children[0];
	const src = activeFotoElement.src;
	const arr = src.split('/');
	const activeFoto = arr[arr.length - 1];

	saveToStorage('activeFoto', activeFoto);
}
