import {savePosition} from './handleLocalStorage.js';
import {underLayoutBreakpoint, switchClass, getInfoFromImg} from './helpers.js'
import showPage from './showPage.js';

const galleryItemSelecClass = 'gallery__item--selected';
const activeDotClass = 'dot--active';

const galleryContent = document.querySelector('.gallery__content');
const dotsContainer = document.getElementsByClassName('dots-controls')[0];

export default function addListenersToGalleryJumpers(data) {

	const jumper = document.querySelector('.gallery__jumper');
	const jumperNext = jumper.querySelector('.gallery__jumper--next');
	const jumperBack = jumper.querySelector('.gallery__jumper--back');

	jumperNext.addEventListener('click', () => { jumpContent('next', data) });
	jumperBack.addEventListener('click', () => { jumpContent('back', data) });

	window.addEventListener('keyup', (e) => {
		if (e.keyCode === 39) { jumpContent('next', data) }
		if (e.keyCode === 37) { jumpContent('back', data) }
	});
}

function jumpContent(dir, data) {

	// if viewport is small content do not use jumpers
	if (underLayoutBreakpoint()) { return }

	// get src info from active gallery item, if there is non return
	const selected = galleryContent.getElementsByClassName(galleryItemSelecClass)[0];
	if (!selected) { return }
	const a = getInfoFromImg(selected)

	// length of active cycle
	const len = data['sk'][a.field][a.cycle].fotos.length - 1;

	// id of new displayed content
	let newId;
	if (dir === 'next') { newId = a.id === len ? 0 : a.id + 1 }
	if (dir === 'back') { newId = a.id === 0 ? len : a.id - 1 }

	showPage(a.field, a.cycle, newId, data, 'sk');
	jumpDot(newId);
	savePosition(a.field, a.cycle, newId);
}

const jumpDot = (newId) => {

	const allDots = dotsContainer.querySelectorAll('.dot');
	const activeDot = dotsContainer.getElementsByClassName(activeDotClass)[0];
	switchClass(activeDot, allDots[newId], activeDotClass);
}
