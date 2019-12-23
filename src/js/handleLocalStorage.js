import {underLayoutBreakpoint} from './helpers.js'

// const galleryItemSelecClass = 'gallery__item--selected';
// const galleryNavSecSelecClass = 'gallery-nav__section--selected';
// const galleryNavItemSelecClass = 'gallery-nav__item--selected';

const storage = window.localStorage;

export function savePosition(activeField, activeCycle, activeFoto ) {

	clearLocalStorage();

	saveToStorage('activeField', activeField);
	saveToStorage('activeCycle', activeCycle);

	// if we are on small screen we do not need foto position
	if (underLayoutBreakpoint()) { return }

	saveToStorage('activeFoto', activeFoto);
}

export function getFromStorage(key) {
	return storage.getItem(key);
}

export function clearLocalStorage() {
	storage.clear();
}

export function saveToStorage(key, data) {
	storage.setItem(key, String(data));
}
