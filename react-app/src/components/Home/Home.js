import React, {Component} from "react";
import "./Home.css";
import Login from "../Login/Login";
import Storage from "../Services/Storage";
import Logger from "../Services/Logger";
import UploadFileButton from "../UploadFileButton/UploadFileButton";
import UserSection from "../UserSection/UserSection";
import Services from "../Services/Services";
import PanelLeft from "../PanelLeft/PanelLeft";
import PanelCenter from "../PanelCenter/PanelCenter";
import PanelRight from "../PanelRight/PanelRight";

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
		this.setBaseMap = this.setBaseMap.bind(this);
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

	setBaseMap(image) {
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
							<UploadFileButton onChange={this.setBaseMap}>Upload</UploadFileButton>
						</div>
						: null
					}
				</div>
				{user ?
					<div className={"container"}>
						<PanelLeft user={user} onRoll={this.sendRoll}/>
						<PanelCenter user={user} sourceImage={sourceImage} sourceAlt={sourceAlt} masterTool={masterTool} onMapSelected={this.setBaseMap} onSendImage={this.uploadImage}/>
						<PanelRight user={user} users={users} enlargePanelRight={enlargePanelRight} onClickImage={this.togglePanelRight}/>
					</div>
					: null}
			</div>
		)
	}
}
