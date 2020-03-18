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
			auth: Storage.getItem("auth")
		};
		this.socket = io.connect();
		this.onLoginSuccess = this.onLoginSuccess.bind(this);
		this.onLogoutSuccess = this.onLogoutSuccess.bind(this);
		this.onMapSelected = this.onMapSelected.bind(this);
	}

	componentDidMount() {
		this.socket.on("image", data => {
			this.logger.log("Received event 'image'", data);
			this.setState({remoteImage: data})
		});
	}

	onLoginSuccess(data) {
		Storage.save("auth", data);
		this.setState({auth: data})
	}

	onLogoutSuccess() {
		Storage.remove("auth");
		this.setState({auth: null})
	}

	onMapSelected(map) {
		this.setState({sourceImage: map.src, sourceAlt: map.alt})
	}

	render() {
		const {sourceImage, sourceAlt, remoteImage, auth} = this.state;
		return (
			<div className="App">
				<Login auth={auth} onLoginSuccess={this.onLoginSuccess} onLogoutSuccess={this.onLogoutSuccess}/>
				{auth === "master" ?
					<div className={"master-tools"}>
						{sourceImage ? <MapLayer image={sourceImage} alt={sourceAlt} socket={this.socket}/> : null}
						<MapList  onMapSelected={this.onMapSelected}/>
					</div> : null}
				{auth === "player" ? remoteImage ? <img alt={"Loading map..."} src={remoteImage}/> : <Spinner/> : null}
			</div>
		);
	}
}
