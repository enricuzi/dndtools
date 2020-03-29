import React, {Component} from "react";
import Logger from "../Services/Logger";
import "./Login.css";

export default class Login extends Component {

	constructor(props) {
		super(props);
		this.logger = new Logger("Login");
		this.state = {
			username: "",
			password: ""
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.logout = this.logout.bind(this);
	}

	onSubmit(e) {
		e.preventDefault();
		this.logger.log("Submitting login...", this.state);
		fetch('/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(this.state)
		}).then(response => {
			if (response.status === 200) {
				return response.text()
			}
			throw new Error("Error while logging...status code " + response.status);
		}).then(data => {
			data = {type: data, id: this.state.username};
			this.logger.log(data);
			this.props.onLoginSuccess && this.props.onLoginSuccess(data);
		}).catch(e => this.logger.error(e));
	}

	logout(e) {
		this.logger.log("Logging out");
		this.props.onLogoutSuccess && this.props.onLogoutSuccess()
	}

	render() {
		const {username, password} = this.state;
		const {user} = this.props;
		if (user) {
			return (
				<div className={"component-login user-login"}>
					<button onClick={this.logout}>Logout</button>
				</div>
			)
		}
		return (
			<div className={"component-login user-logout"}>
				<form onSubmit={this.onSubmit}>
					<label>
						<input placeholder={"Username"} value={username} onChange={e => this.setState({username: e.target.value})}/>
					</label>
					<label>
						<input placeholder={"Password"} value={password} onChange={e => this.setState({password: e.target.value})}/>
					</label>
					<input type={"submit"} value={"Login"}/>
				</form>
			</div>
		)
	}
}
