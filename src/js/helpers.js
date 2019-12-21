
export function underLayoutBreakpoint() {
	const layoutBreakPoint = 900;
	return layoutBreakPoint > window.innerWidth ? true : false;
}

export const switchClass = (remove, add, className) => {
	remove.classList.remove(className);
	add.classList.add(className);
}
