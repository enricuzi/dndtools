import React, {Component} from "react"
import Logger from "../Services/Logger"
import "./Login.css"
import Services from "../Services/Services"
import Events from "../../models/Events"

export default class Login extends Component {

    constructor(props) {
        super(props)
        this.logger = new Logger("Login")
        this.state = {
            username: "",
            password: ""
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.logout = this.logout.bind(this)
    }

    onSubmit(e) {
        e.preventDefault()
        Services.doPost("/login", this.state).then(data => {
            data = {type: data.type, id: this.state.username}
            this.logger.log("Login success", data)
            Events.publish(Events.LogIn, data)
        }).catch(() => this.logger.error("Failed to login"))
    }

    logout(e) {
        this.logger.log("Logging out")
        Events.publish(Events.LogOut)
    }

    render() {
        const {username, password} = this.state
        const {user} = this.props
        if (user) {
            return (
                <div className={"component-login user-login"}>
                    <button className={"clear"} onClick={this.logout}>Logout</button>
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
                    <input className={"save"} type={"submit"} value={"Login"}/>
                </form>
            </div>
        )
    }
}
