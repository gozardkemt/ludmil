
const galleryItemSelecClass = 'gallery__item--selected';
const galleryList = document.querySelector('.gallery__list');

export default function showPage(field, cycle, id, data, lang) {

	// getting info about foto
	const caption = data['sk'][field][cycle].fotos[id];

	const promise = import(`../img/${field}/${cycle}/${id}.jpg`);
	promise.then( (d) => {
		galleryList.innerHTML = renderPage(d.default, caption, cycle)
	});
}

function renderPage(src, caption, cycle) {
	 return	`<li class="gallery__item ${galleryItemSelecClass}">
				<figure class="gallery__figure">
					<img class="gallery__image" src="${src}" alt="${cycle}_foto">
					<figcaption class="gallery__caption">${caption}</figcaption>
				</figure>
			</li>`;
}
