
const storage = window.localStorage;

export function getFromStorage(key) {
	return storage.getItem(key);
}

export function clearLocalStorage() {
	storage.clear();
}

export function saveToStorage(key, data) {
	storage.setItem(key, String(data));
}
