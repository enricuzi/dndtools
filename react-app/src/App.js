import React, {Component} from 'react';
import './App.css';
import MapLayer from "./components/MapLayer";
import io from 'socket.io-client';
import Login from "./components/Login";
import Logger from "./Logger";
import MapList from "./components/MapList";
import Storage from "./Storage";
import Spinner from "./components/Spinner";

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
			users: []
		};
		this.socket = io.connect();
		this.onLoginSuccess = this.onLoginSuccess.bind(this);
		this.onLogoutSuccess = this.onLogoutSuccess.bind(this);
		this.onMapSelected = this.onMapSelected.bind(this);
	}

	componentDidMount() {
		this.socket.on("image", data => {
			this.logger.log("Received remote image...");
			this.setState({remoteImage: data})
		});
		this.socket.on("join", data => {
			this.logger.log("User joined the room", data);
		});
	}

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

	onMapSelected(image) {
		this.setState({sourceImage: image.src, sourceAlt: image.alt})
	}

	render() {
		const {sourceImage, sourceAlt, remoteImage, user, users} = this.state;
		this.logger.log("User data", user);
		return (
			<div className="App">
				<Login user={user} onLoginSuccess={this.onLoginSuccess} onLogoutSuccess={this.onLogoutSuccess}/>
				{(user && user.type === "master") ?
					<div className={"master-tools"}>
						{sourceImage ? <MapLayer image={sourceImage} alt={sourceAlt} socket={this.socket} onFileUpload={this.onMapSelected}/> : null}
						<MapList  onMapSelected={this.onMapSelected}/>
					</div> : null}
				{(user && user.type === "player") ? remoteImage ? <img alt={"Loading map..."} src={remoteImage}/> : <Spinner/> : null}
				{users.map(u => <div className={`section-${u}`}></div>)}
			</div>
		);
	}
}
