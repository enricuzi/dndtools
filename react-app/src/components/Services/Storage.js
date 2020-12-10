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

	static filterItem(key, filter, store) {
		if (!this.contains(key)) {
			return null
		}
		store = store || this.store
		const item = this.getItem(key, store)
		return item[filter]
	}

	static updateItem(key, filter, data, store) {
		store = store || this.store;
		if (!this.contains(key)) {
			return null
		}
		const item = this.getItem(key, store)
		item[filter] = data
		this.save(key, item, store)
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
