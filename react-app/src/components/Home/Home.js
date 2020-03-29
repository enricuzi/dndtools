import React, {Component} from "react";
import "./Home.css";
import Login from "../Login/Login";
import Storage from "../../Storage";
import DiceRoller from "../DiceRoller/DiceRoller";
import Logger from "../../Logger";
import UploadFileButton from "../UploadFileButton/UploadFileButton";
import MapLayer from "../MapLayer/MapLayer";
import BaldursGateMaps from "../BaldursGateMaps/BaldursGateMaps";
import FreeDraw from "../FreeDraw/FreeDraw";
import UserSection from "../UserSection/UserSection";

export default class Home extends Component {

	constructor(props) {
		super(props);
		this.logger = new Logger("Home");

		this.state = {
			user: Storage.getItem("user")
		};

		this.onLoginSuccess = this.onLoginSuccess.bind(this);
		this.onLogoutSuccess = this.onLogoutSuccess.bind(this);
		this.sendRoll = this.sendRoll.bind(this);
		this.uploadImage = this.uploadImage.bind(this);
		this.setSourceImage = this.setSourceImage.bind(this);
	}

	componentDidMount() {
		this.socket = this.props.socket;

		if (this.state.user) {
			this.socket.emit("login", this.state.user);
		}
	}

	sendRoll(data) {
		this.logger.log("Sending roll", data);
		const {id} = this.state.user;
		this.socket.emit("roll", {id, data});
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
		this.setState({user: null});
	}

	uploadImage(image) {
		this.logger.log("Uploading image...");
		this.socket.emit("upload", {
			image: image,
			user: this.state.user
		});
	}

	setSourceImage(image) {
		this.setState({sourceImage: image.src, sourceAlt: image.alt})
	}

	render() {
		const {sourceImage, sourceAlt, user, masterTool} = this.state;
		const {users} = this.props;
		return (
			<div className={"home"}>
				<div className={"header"}>
					<Login user={user} onLoginSuccess={this.onLoginSuccess} onLogoutSuccess={this.onLogoutSuccess}/>
					{user && user.type === "master" ?
						<div className={"master-tools"}>
							<button onClick={() => this.setState({masterTool: "baldursFateMaps"})}>Baldur's Gate</button>
							<button onClick={() => this.setState({masterTool: "freeDraw", sourceImage: null})}>Free Draw</button>
							<UploadFileButton onChange={this.setSourceImage}>Upload</UploadFileButton>
						</div>
						: null
					}
				</div>
				{user ?
					<div className={"container"}>
						<div className={"panel panel-left"}>
							<DiceRoller onRoll={this.sendRoll}/>
						</div>
						<div className={"panel panel-content"}>
							{user.type === "master" ?
								<div className={"master-tools"}>
									{sourceImage ?
										<MapLayer image={sourceImage} alt={sourceAlt} onSendImage={this.uploadImage}/> : null}
									{masterTool === "baldursFateMaps" ?
										<BaldursGateMaps onMapSelected={this.setSourceImage}/> : null}
									{masterTool === "freeDraw" ?
										<FreeDraw onSendImage={this.uploadImage}/> : null}
								</div>
								: null}
							{user.type === "player" ?
								<div className={"player-tools"}>
									<FreeDraw onSendImage={this.uploadImage}/>
								</div>
								: null}
						</div>
						<div className={"panel panel-right"}>
							{users.map(u => u.id !== user.id ?
								<UserSection user={u}/>
								: null
							)}
						</div>
					</div>
					: null}
			</div>
		)
	}
}
