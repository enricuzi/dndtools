import React, {useEffect, useMemo, useState} from "react"
import "./Home.css"
import Login from "../Login/Login"
import Storage from "../Services/Storage"
import Logger from "../Services/Logger"
import Services from "../Services/Services"
import PanelLeft from "../PanelLeft/PanelLeft"
import PanelCenter from "../PanelCenter/PanelCenter"
import PanelRight from "../PanelRight/PanelRight"
import Events from "../../models/Events";
import Utils from "../Utils/Utils";

const Home = props => {

    const logger = useMemo(() => new Logger("Home"), [])

    const [user, setUser] = useState(Utils.isDevEnvironment() ? {type: 'master'} : Storage.getItem("user", sessionStorage))
    const [users, setUsers] = useState([])

    Services.init()

    Events.onSendImage(image => {
        logger.log("Uploading image...")
        Services.publish("upload", {
            image: image,
            user: user
        })
    })

    /**
     * onLoginSuccess
     * @param user: {type: "master|player", id: "[username]"}
     */
    Events.onLogIn(user => {
        Storage.save("user", user, sessionStorage)
        Services.publish("login", user)
        setUser(user)
    })
    Events.onLogOut(() => {
        Storage.remove("user", sessionStorage)
        Services.publish("logout", user)
        setUser(null)
    })

    useEffect(() => {
        Services.onImage(data => {
            logger.log("Received remote image from user", data.user)
            users.find(user => user.id === data.user.id).image = data.image
            setUsers(users)
        })
        Services.onJoin(users => updateUsers(users))
        Services.onLeave(users => updateUsers(users))
        Services.onRoll(users => updateUsers(users))
        if (user && Utils.isProdEnvironment()) {
            Services.publish("login", user)
        }
    }, [])

    useEffect(() => {
        const obsRoll = Events.onRoll(value => {
            user.rolls = user.rolls || []
            user.rolls.splice(0, 0, value)
            logger.log("Sending roll", value, user)
            setUser(user)
            const {id} = user
            Services.publish("roll", {id, rolls: user.rolls})
        })
        Events.onAttributeBonusChange(value => {
        })
        return () => {
            obsRoll.unsubscribe()
        }
    }, [user])

    function updateUsers(users) {
        logger.log("Updating users...", users)
        setUsers(users)
    }

    if (user) {
        return (
            <div className={"home"}>
                <PanelCenter user={user} />
                <PanelLeft user={user} />
                <PanelRight user={user} users={users} />
            </div>
        )
    }
    return (
        <Login />
    )
}

export default Home