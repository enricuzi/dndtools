import React, {Component} from 'react';
import './App.css';
import MapLayer from "./components/MapLayer";
import io from 'socket.io-client';
import Login from "./components/Login";
import Logger from "./Logger";
import BaldursGateMaps from "./components/BaldursGateMaps";
import Storage from "./Storage";
import Spinner from "./components/Spinner";
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

	setSourceImage(image) {
		this.setState({sourceImage: image.src, sourceAlt: image.alt})
	}

	uploadImage(image) {
		this.socket.emit("upload", image);
	}

	render() {
		const {sourceImage, sourceAlt, remoteImage, user, users, masterTool} = this.state;
		this.logger.log("User data", user);
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
				{(user && user.type === "player") ? remoteImage ? <img alt={"Loading map..."} src={remoteImage}/> : <Spinner/> : null}
				{users.map(u => <div className={`section-${u}`}></div>)}
			</div>
		);
	}
}
