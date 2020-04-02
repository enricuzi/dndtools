import io from "socket.io-client";
import Logger from "./Logger";

export default class Services {

	static socket;
	static logger = new Logger("Services");

	static init() {
		if (!this.socket) {
			this.socket = io.connect();
		}
		return this.socket;
	}

	static subscribe(key, callback) {
		this.logger.log("Subscribing event", key);
		this.socket.on(key, data => {
			this.logger.log("Receiving data event for", key, data);
			callback(data)
		});
	}

	static publish(key, data) {
		this.logger.log("Emitting event", key, data);
		this.socket.emit(key, data);
	}

	static onRoll(callback) {
		this.subscribe("roll", callback);
	}

	static onLeave(callback) {
		this.subscribe("leave", callback);
	}

	static onJoin(callback) {
		this.subscribe("join", callback);
	}

	static onImage(callback) {
		this.subscribe("image", callback);
	}

	static doPost(url, data) {
		this.logger.log("Submitting data", url, data);
		return new Promise((resolve, reject) => {
			fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			}).then(response => {
				this.logger.log("Reading response for url", url, response);
				if (response.status === 200) {
					return response.json()
				}
				throw new Error(response.status);
			}).then(data => resolve(data))
				.catch(e => {
					this.logger.error(e);
					reject(e)
				});
		})
	}
}
