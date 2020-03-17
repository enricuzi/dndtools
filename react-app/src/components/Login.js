import React, {Component} from "react";
import Logger from "../Logger";

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
			return ""
		}).then(data => {
			this.logger.log(data);
			this.props.onLoginSuccess && this.props.onLoginSuccess(data);
		});
	}

	logout(e) {
		this.logger.log("Logging out");
		this.props.onLogoutSuccess && this.props.onLogoutSuccess()
	}

	render() {
		const {username, password} = this.state;
		const {auth} = this.props;
		if (auth) {
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
