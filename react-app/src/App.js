import React, {Component} from 'react';
import './App.css';
import io from 'socket.io-client';
import Logger from "./Logger";
import Home from "./components/Home/Home";

export default class App extends Component {

	constructor(props) {
		super(props);
		this.logger = new Logger("App");
		this.state = {
			sourceImage: null,
			sourceAlt: null,
			image: null,
			remote: null,
			users: [],
			masterTool: null
		};
		this.socket = io.connect();
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
		this.socket.on("roll", users => {
			this.logger.log("User rolled value", users);
			this.setState({users});
		});
	}

	render() {
		const {users} = this.state;
		return (
			<div className="App">
				<Home socket={this.socket} users={users}/>
			</div>
		);
	}
}
