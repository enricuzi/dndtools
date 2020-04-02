export default class Storage {

	static store = localStorage;

	static set storage(target) {
		this.store = target;
	}

	static get storage() {
		return this.store;
	}

	static getItem(key, store) {
		if (!this.contains(key, store)) {
			return null;
		}
		store = store || this.store;
		return JSON.parse(store.getItem(key))
	}

	static save(key, value, store) {
		store = store || this.store;
		store.setItem(key, JSON.stringify(value))
	}

	static remove(key, store) {
		store = store || this.store;
		store.removeItem(key)
	}

	static contains(key, store) {
		store = store || this.store;
		return store.hasOwnProperty(key)
	}
}
