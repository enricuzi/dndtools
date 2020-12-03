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
        Events.Tool.publish(Events.Tool.ROLL, {value: roll})
    }

    function onFreeDrawSelected() {
        togglePanel()
        Events.Tool.publish(Events.Tool.SELECTED_FREE_DRAW)
    }

    function onUploadImageSelected(image) {
        togglePanel()
        Events.Tool.publish(Events.Tool.SELECTED_UPLOAD_IMAGE, {image})
    }

    function onCharacterStats() {
        togglePanel()
        Events.Tool.publish(Events.Tool.CHARACTER_STATS)
    }

    function togglePanel() {
        setPanelState(panelState ? '' : Constants.OPEN)
        Events.Panel.publish(panelState ? Events.Panel.PANEL_LEFT_OPENED : Events.Panel.PANEL_LEFT_CLOSED)
    }

    function setFreeDrawColor(e) {
        const {color} = e.target.dataset
        logger.log('Color selected', color)
        Events.Tool.publish(Events.Tool.FREE_DRAW_COLOR, {value: color})
        Events.Tool.publish(Events.Tool.FREE_DRAW_MODE, {value: Constants.Tool.FREE_DRAW_MODE_DRAW})
    }

    function setFreeDrawEraser() {
        Events.Tool.publish(Events.Tool.FREE_DRAW_MODE, {value: Constants.Tool.FREE_DRAW_MODE_ERASER})
    }

    function setFreeDrawLineWidth(e) {
        Events.Tool.publish(Events.Tool.FREE_DRAW_LINE_WIDTH, {value: e.target.value})
    }

    const {user} = props
    return (
        <div className={`panel panel-left ${panelState}`}>
            {
                user && user.type === "master" ?
                    <div className={`header`}>
                        <div className={'master-tools'}>
                            <button onClick={onFreeDrawSelected}>Free Draw</button>
                            <UploadFileButton onChange={onUploadImageSelected}>Upload</UploadFileButton>
                            <button onClick={onCharacterStats}>Characters</button>
                        </div>
                    </div>
                    : null
            }

            <div className={'color-chooser'}>
                <button className={'green'} data-color={Constants.Color.green} onClick={setFreeDrawColor}>Green</button>
                <button className={'blue'} data-color={Constants.Color.blue} onClick={setFreeDrawColor}>Blue</button>
                <button className={'red'} data-color={Constants.Color.red} onClick={setFreeDrawColor}>Red</button>
                <button className={'yellow'} data-color={Constants.Color.yellow} onClick={setFreeDrawColor}>Yellow</button>
                <button className={'orange'} data-color={Constants.Color.orange} onClick={setFreeDrawColor}>Orange</button>
                <button className={'black'} data-color={Constants.Color.black} onClick={setFreeDrawColor}>Black</button>
                <button className={'white'} data-color={Constants.Color.white} onClick={setFreeDrawColor}>White</button>
                <button className={'eraser'} onClick={setFreeDrawEraser}>Eraser</button>
                <select onChange={setFreeDrawLineWidth}>
                    <option value={'2'}>2</option>
                    <option value={'10'} selected={true}>10</option>
                    <option value={'20'}>20</option>
                </select>
            </div>

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
