import React, {Component} from "react"
import "./Home.css"
import Login from "../Login/Login"
import Storage from "../Services/Storage"
import Logger from "../Services/Logger"
import Services from "../Services/Services"
import PanelLeft from "../PanelLeft/PanelLeft"
import PanelCenter from "../PanelCenter/PanelCenter"
import PanelRight from "../PanelRight/PanelRight"
import Events from "../../models/Events";

export default class Home extends Component {

    constructor(props) {
        super(props)
        this.logger = new Logger("Home")

        this.state = {
            user: Storage.getItem("user", sessionStorage),
            users: [],
            enlargePanelRight: "",
            deltaLeft: 0
        }

        this.sendRoll = this.sendRoll.bind(this)
        this.uploadImage = this.uploadImage.bind(this)
        this.togglePanelRight = this.togglePanelRight.bind(this)
        this.updateUsers = this.updateUsers.bind(this)

        Services.init()

        /**
         * onLoginSuccess
         * @param user: {type: "master|player", id: "[username]"}
         */
        Events.User.login(user => {
            Storage.save("user", user, sessionStorage)
            Services.publish("login", user)
            this.setState({user})
        })
        Events.User.logout(() => {
            Storage.remove("user", sessionStorage)
            Services.publish("logout", this.state.user)
            this.setState({user: null})
        })
    }

    componentDidMount() {
        Services.onImage(data => {
            this.logger.log("Received remote image from user", data.user)
            const {users} = this.state
            users.find(user => user.id === data.user.id).image = data.image
            this.setState({users})
        })
        Services.onJoin(users => this.updateUsers(users))
        Services.onLeave(users => this.updateUsers(users))
        Services.onRoll(users => this.updateUsers(users))
        if (this.state.user) {
            Services.publish("login", this.state.user)
        }
    }

    updateUsers(users) {
        this.logger.log("Updating users...", users)
        this.setState({users})
    }

    sendRoll(roll) {
        const {user} = this.state
        user.rolls = user.rolls || []
        user.rolls.splice(0, 0, roll)
        this.logger.log("Sending roll", roll, user)
        this.setState({user})
        const {id} = user
        Services.publish("roll", {id, rolls: user.rolls})
    }

    uploadImage(image) {
        this.logger.log("Uploading image...")
        Services.publish("upload", {
            image: image,
            user: this.state.user
        })
    }

    togglePanelRight() {
        this.setState({
            enlargePanelRight: !this.state.enlargePanelRight ? "big" : ""
        })
    }

    render() {
        const {user, users, enlargePanelRight} = this.state
        this.logger.log('State', this.state)
        if (user) {
            return (
                <div className={"home"}>
                    <div className={"container"}>
                        <PanelCenter user={user} onMapSelected={this.setBaseMap} onSendImage={this.uploadImage}/>
                        <PanelLeft user={user} onRoll={this.sendRoll}/>
                        <PanelRight user={user} users={users} enlargePanelRight={enlargePanelRight} onClickImage={this.togglePanelRight}/>
                    </div>
                </div>
            )
        }
        return (
            <Login/>
        )
    }
}
