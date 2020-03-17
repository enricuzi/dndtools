export default class Storage {

	static store = sessionStorage;


	static set storage(target) {
		this.store = target;
	}

	static get storage() {
		return this.store;
	}

	static getItem(key) {
		return this.store.getItem(key)
	}

	static save(key, value) {
		this.store.setItem(key, value)
	}

	static remove(key) {
		this.store.removeItem(key)
	}

	static contains(key) {
		return this.store.hasOwnProperty(key)
	}
}
