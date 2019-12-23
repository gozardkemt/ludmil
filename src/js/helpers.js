
export function underLayoutBreakpoint() {
	const layoutBreakPoint = 900;
	return layoutBreakPoint > window.innerWidth ? true : false;
}

export const switchClass = (remove, add, className) => {
	remove.classList.remove(className);
	add.classList.add(className);
}

export function getInfoFromImg(activeItem) {

	const activeImgSrc = activeItem.children[0].children[0].src;
	const arr = activeImgSrc.split('/');

	const id = parseInt(arr[arr.length - 1]);
	const cycle = arr[arr.length - 2];
	const field = arr[arr.length - 3];

	return {
		id,
		cycle,
		field
	}
}
