import React, {Component} from 'react';
import './App.css';
import MapLayer from "./components/MapLayer";
import io from 'socket.io-client';
import Login from "./components/Login";
import Logger from "./Logger";
import BaldursGateMaps from "./components/BaldursGateMaps";
import Storage from "./Storage";
import FreeDraw from "./components/FreeDraw";
import UploadFileButton from "./components/UploadFileButton";

export default class App extends Component {

	constructor(props) {
		super(props);
		this.logger = new Logger("App");
		this.state = {
			sourceImage: null,
			sourceAlt: null,
			image: null,
			remote: null,
			user: Storage.getItem("user"),
			users: [],
			masterTool: null
		};
		this.socket = io.connect();
		this.onLoginSuccess = this.onLoginSuccess.bind(this);
		this.onLogoutSuccess = this.onLogoutSuccess.bind(this);
		this.setSourceImage = this.setSourceImage.bind(this);
		this.uploadImage = this.uploadImage.bind(this);
	}

	componentDidMount() {
		this.socket.on("image", data => {
			this.logger.log("Received remote image from user", data.user);
			const {users} = this.state;
			users.find(user => user.id === data.user.id).image = data.image;
			this.setState({users});
		});
		this.socket.on("join", users => {
			this.logger.log("New user joined the room", users);
			this.setState({users});
		});
		this.socket.on("leave", users => {
			this.logger.log("An user left the room", users);
			this.setState({users});
		});
		if (this.state.user) {
			this.socket.emit("login", this.state.user);
		}
	}

	/**
	 * onLoginSuccess
	 * @param user: {type: "master|player", id: "[username]"}
	 */
	onLoginSuccess(user) {
		Storage.save("user", user);
		this.socket.emit("login", user);
		this.setState({user});
	}

	onLogoutSuccess() {
		Storage.remove("user");
		this.socket.emit("logout", this.state.user);
		this.setState({user: null})
	}

	setSourceImage(image) {
		this.setState({sourceImage: image.src, sourceAlt: image.alt})
	}

	uploadImage(image) {
		this.logger.log("Uploading image...");
		this.socket.emit("upload", {
			image: image,
			user: this.state.user
		});
	}

	render() {
		const {sourceImage, sourceAlt, user, users, masterTool} = this.state;
		return (
			<div className="App">
				<Login user={user} onLoginSuccess={this.onLoginSuccess} onLogoutSuccess={this.onLogoutSuccess}/>
				{(user && user.type === "master") ?
					<div className={"master-tools"}>
						<button onClick={() => this.setState({masterTool: "baldursFateMaps"})}>Baldur's Gate</button>
						<button onClick={() => this.setState({masterTool: "freeDraw", sourceImage: null})}>Free Draw</button>
						<UploadFileButton onChange={this.setSourceImage}>Upload</UploadFileButton>
						{sourceImage ? <MapLayer image={sourceImage} alt={sourceAlt} onSendImage={this.uploadImage}/> : null}
						{masterTool === "baldursFateMaps" ? <BaldursGateMaps onMapSelected={this.setSourceImage}/> : null}
						{masterTool === "freeDraw" ? <FreeDraw onSendImage={this.uploadImage}/> : null}
					</div>
					: null}
				{(user && user.type === "player") ?
					<div className={"player-tools"}>
						<FreeDraw onSendImage={this.uploadImage}/>
					</div>
					: null}
				{users.map(user => user.image ?
					<div className={`section-${user.id}`}>
						<fieldset>
							<legend>{user.id}</legend>
							<img alt={"User image"} src={user.image}/>
						</fieldset>
					</div>
					: null
				)}
			</div>
		);
	}
}
