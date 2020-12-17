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

	static getItemOrDefault(key, defaultValue, store) {
		return this.getItem(key, store) || defaultValue
	}

	static getFilteredItem(key, filter, store) {
		if (!this.contains(key)) {
			return null
		}
		store = store || this.store
		const item = this.getItem(key, store)
		return item[filter]
	}

	static getFilteredItemOrDefault(key, filter, defaultValue, store) {
		if (!this.contains(key, store)) {
			return defaultValue
		}
		return this.getFilteredItem(key, filter, store) || defaultValue
	}

	static saveFilteredItem(key, filter, data, store) {
		const item = this.getItem(key, store) || {}
		item[filter] = data
		this.save(key, item, store)
	}

	static save(key, value, store) {
		store = store || this.store;
		store.setItem(key, JSON.stringify(value))
	}

	static removeFilteredItem(key, filter, store) {
		const item = this.getItem(key, store)
		if (item) {
			delete item[filter]
			this.save(item)
		}
	}

	static removeIndexItem(key, index, store) {
		const item = this.getItem(key, store)
		if (item) {
			item.splice(index, 1)
			this.save(key, item)
		}
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
