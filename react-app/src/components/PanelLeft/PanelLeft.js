import React, {useState} from "react"
import './PanelLeft.css'
import DiceRoller from "../DiceRoller/DiceRoller"
import CharacterSheetContainer from "../CharacterSheetContainer/CharacterSheetContainer"
import Events from "../../models/Events"
import Constants from "../../models/Constants"
import Logger from "../Services/Logger";
import Login from "../Login/Login";
import UploadFileButton from "../UploadFileButton/UploadFileButton";

const PanelLeft = props => {

    const logger = new Logger("PanelLeft")
    const [panelState, setPanelState] = useState('')

    function onRoll(roll) {
        props.onRoll && props.onRoll(roll)
    }

    function onFreeDrawSelected() {
        togglePanel()
        Events.Tool.publish(Events.Tool.SELECTED_FREE_DRAW)
    }

    function onUploadImageSelected(image) {
        togglePanel()
        Events.Tool.publish(Events.Tool.SELECTED_UPLOAD_IMAGE, {image})
    }

    function togglePanel() {
        setPanelState(panelState ? '' : Constants.OPEN)
        Events.Panel.publish(panelState ? Events.Panel.PANEL_LEFT_OPENED : Events.Panel.PANEL_LEFT_CLOSED)
    }

    const {user} = props
    return (
        <div className={`panel panel-left ${panelState}`}>
            {
                user && user.type === "master" ?
                    <div className={`header`}>
                        <div className={"master-tools"}>
                            <button onClick={onFreeDrawSelected}>Free Draw</button>
                            <UploadFileButton onChange={onUploadImageSelected}>Upload</UploadFileButton>
                        </div>
                    </div>
                    : null
            }

            <DiceRoller onRoll={onRoll} rolls={user.rolls}/>
            {user.type === "player" ?
                <CharacterSheetContainer/>
                : null}
            <div className={'close'} onClick={togglePanel}>
                <span className={'icon icon-close'}>{'<'}</span>
                <span className={'icon icon-open'}>{'>'}</span>
            </div>

            <Login user={user}/>
        </div>
    )
}

export default PanelLeft
