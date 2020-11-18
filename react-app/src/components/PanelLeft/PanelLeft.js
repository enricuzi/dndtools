import React, {Component} from "react"
import './PanelLeft.css'
import DiceRoller from "../DiceRoller/DiceRoller"
import CharacterSheetContainer from "../CharacterSheetContainer/CharacterSheetContainer"
import Events from "../../models/Events"
import Constants from "../../models/Constants"
import Logger from "../Services/Logger";
import Login from "../Login/Login";
import UploadFileButton from "../UploadFileButton/UploadFileButton";

export default class PanelLeft extends Component {

    constructor(props) {
        super(props)
        this.logger = new Logger("PanelLeft")
        this.onRoll = this.onRoll.bind(this)
        this.togglePanel = this.togglePanel.bind(this)
        this.onFreeDrawSelected = this.onFreeDrawSelected.bind(this)
        this.onUploadImageSelected = this.onUploadImageSelected.bind(this)
        this.state = {
            panelState: ''
        }
        this.panelLeft = React.createRef()
    }

    componentDidMount() {
        const width = this.panelLeft.current.offsetWidth
        this.logger.log('width:', width)
        Events.Panel.publish(Events.Panel.PANEL_LEFT_READY, {value: width})
    }

    onRoll(roll) {
        this.props.onRoll && this.props.onRoll(roll)
    }

    onFreeDrawSelected() {
        this.togglePanel()
        Events.Tool.publish(Events.Tool.SELECTED_FREE_DRAW)
    }

    onUploadImageSelected(image) {
        this.togglePanel()
        Events.Tool.publish(Events.Tool.SELECTED_UPLOAD_IMAGE, {image})
    }

    togglePanel() {
        const panelState = this.state.panelState ? '' : Constants.OPEN
        this.setState({panelState})
        Events.Panel.publish(panelState ? Events.Panel.PANEL_LEFT_OPENED : Events.Panel.PANEL_LEFT_CLOSED)
    }

    render() {
        const {user} = this.props
        const {panelState} = this.state
        return (
            <div className={`panel panel-left ${panelState}`} ref={this.panelLeft}>
                {
                    user && user.type === "master" ?
                        <div className={`header`}>
                            <div className={"master-tools"}>
                                <button onClick={this.onFreeDrawSelected}>Free Draw</button>
                                <UploadFileButton onChange={this.onUploadImageSelected}>Upload</UploadFileButton>
                            </div>
                        </div>
                        : null
                }

                <DiceRoller onRoll={this.onRoll} rolls={user.rolls}/>
                {user.type === "player" ?
                    <CharacterSheetContainer/>
                    : null}
                <div className={'close'} onClick={this.togglePanel}>
                    <span className={'icon icon-close'}>{'<'}</span>
                    <span className={'icon icon-open'}>{'>'}</span>
                </div>

                <Login user={user}/>
            </div>
        )
    }
}
