import React, {Component} from "react";
import "./Home.css";
import Login from "../Login/Login";
import Storage from "../Services/Storage";
import DiceRoller from "../DiceRoller/DiceRoller";
import Logger from "../Services/Logger";
import UploadFileButton from "../UploadFileButton/UploadFileButton";
import MapLayer from "../MapLayer/MapLayer";
import BaldursGateMaps from "../BaldursGateMaps/BaldursGateMaps";
import FreeDraw from "../FreeDraw/FreeDraw";
import UserSection from "../UserSection/UserSection";
import CharacterSheetContainer from "../CharacterSheetContainer/CharacterSheetContainer";
import NoteSection from "../NoteSection/NoteSection";
import Services from "../Services/Services";

export default class Home extends Component {

	constructor(props) {
		super(props);
		this.logger = new Logger("Home");

		this.state = {
			user: Storage.getItem("user", sessionStorage),
			users: [],
			enlargePanelRight: ""
		};

		this.onLoginSuccess = this.onLoginSuccess.bind(this);
		this.onLogoutSuccess = this.onLogoutSuccess.bind(this);
		this.sendRoll = this.sendRoll.bind(this);
		this.uploadImage = this.uploadImage.bind(this);
		this.setSourceImage = this.setSourceImage.bind(this);
		this.togglePanelRight = this.togglePanelRight.bind(this);
		this.updateUsers = this.updateUsers.bind(this);

		Services.init();
	}

	componentDidMount() {
		Services.onImage(data => {
			this.logger.log("Received remote image from user", data.user);
			const {users} = this.state;
			users.find(user => user.id === data.user.id).image = data.image;
			this.setState({users});
		});
		Services.onJoin(users => this.updateUsers(users));
		Services.onLeave(users => this.updateUsers(users));
		Services.onRoll(users => this.updateUsers(users));
		if (this.state.user) {
			Services.publish("login", this.state.user);
		}
	}

	updateUsers(users) {
		this.logger.log("Updating users...", users);
		this.setState({users})
	}

	sendRoll(roll) {
		const {user} = this.state;
		user.rolls = user.rolls || [];
		user.rolls.splice(0, 0, roll);
		this.logger.log("Sending roll", roll, user);
		this.setState({user});
		const {id} = user;
		Services.publish("roll", {id, rolls: user.rolls});
	}

	/**
	 * onLoginSuccess
	 * @param user: {type: "master|player", id: "[username]"}
	 */
	onLoginSuccess(user) {
		Storage.save("user", user, sessionStorage);
		Services.publish("login", user);
		this.setState({user});
	}

	onLogoutSuccess() {
		Storage.remove("user", sessionStorage);
		Services.publish("logout", this.state.user);
		this.setState({user: null});
	}

	uploadImage(image) {
		this.logger.log("Uploading image...");
		Services.publish("upload", {
			image: image,
			user: this.state.user
		});
	}

	setSourceImage(image) {
		this.setState({sourceImage: image.src, sourceAlt: image.alt})
	}

	togglePanelRight() {
		this.setState({
			enlargePanelRight: !this.state.enlargePanelRight ? "big" : ""
		})
	}

	render() {
		const {sourceImage, sourceAlt, user, users, masterTool, enlargePanelRight} = this.state;
		this.logger.log("Users", users);
		return (
			<div className={"home"}>
				<div className={`header header-${user ? "logout" : "login"}`}>
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
							<DiceRoller onRoll={this.sendRoll} rolls={user.rolls}/>
							{user.type === "player" ?
								<CharacterSheetContainer/>
								: null}
						</div>
						<div className={"panel panel-center"}>
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
							<NoteSection/>
						</div>
						<div className={`panel panel-right ${enlargePanelRight}`}>
							{users.map(u => u.id !== user.id ?
								<UserSection user={u} onClickImage={this.togglePanelRight}/>
								: null)}
						</div>
					</div>
					: null}
			</div>
		)
	}
}
