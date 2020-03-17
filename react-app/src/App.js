import React, {Component} from 'react';
import './App.css';
import MapLayer from "./components/MapLayer";
import io from 'socket.io-client';
import Login from "./components/Login";
import Logger from "./Logger";
import MapList from "./components/MapList";

export default class App extends Component {

	constructor(props) {
		super(props);
		this.logger = new Logger("App");
		this.state = {
			sourceImage: null,
			image: null,
			remote: null,
			authType: null
		};
		this.socket = io.connect();
		this.onLoginSuccess = this.onLoginSuccess.bind(this);
		this.onMapSelected = this.onMapSelected.bind(this);
	}

	componentDidMount() {
		this.socket.on("image", data => {
			this.logger.log("Received event 'image'", data);
			this.setState({remoteImage: data})
		});
	}

	onLoginSuccess(data) {
		this.setState({authType: data})
	}

	onMapSelected(map) {
		this.setState({sourceImage: map.src})
	}

	render() {
		const {sourceImage, remoteImage, authType} = this.state;
		return (
			<div className="App">
				<Login onLoginSuccess={this.onLoginSuccess}/>
				{authType === "master" ?
					<div className={"master-tools"}>
						{sourceImage ? <MapLayer image={sourceImage} socket={this.socket}/> : null}
						<MapList  onMapSelected={this.onMapSelected}/>
					</div> : null}
				{authType === "player" ? <img alt={"Loading map..."} src={remoteImage}/> : null}
			</div>
		);
	}
}
