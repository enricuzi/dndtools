import React, {Component} from "react"
import './PanelLeft.css'
import DiceRoller from "../DiceRoller/DiceRoller"
import CharacterSheetContainer from "../CharacterSheetContainer/CharacterSheetContainer"
import Events from "../../models/Events"
import Constants from "../../models/Constants"
import Logger from "../Services/Logger";

export default class PanelLeft extends Component {

    constructor(props) {
        super(props)
        this.logger = new Logger("PanelLeft")
        this.onRoll = this.onRoll.bind(this)
        this.togglePanel = this.togglePanel.bind(this)
        this.state = {
            panelState: ''
        }
        this.panelLeft = React.createRef()
    }

    componentDidMount() {
        const width = this.panelLeft.current.offsetWidth
        this.logger.log('width:', width)
        Events.PanelState.publish(Events.PANEL_LEFT_READY, {value: width})
    }

    onRoll(roll) {
        this.props.onRoll && this.props.onRoll(roll)
    }

    togglePanel() {
        const panelState = this.state.panelState ? '' : Constants.CLOSED
        this.setState({panelState})
        Events.PanelState.publish(panelState ? Events.PANEL_LEFT_CLOSED : Events.PANEL_LEFT_OPENED)
    }

    render() {
        const {user} = this.props
        const {panelState} = this.state
        return (
            <div className={`panel panel-left ${panelState}`} ref={this.panelLeft}>
                <DiceRoller onRoll={this.onRoll} rolls={user.rolls}/>
                {user.type === "player" ?
                    <CharacterSheetContainer/>
                    : null}
                <div className={'close'} onClick={this.togglePanel}>
                    <span className={'icon icon-close'}>{'<'}</span>
                    <span className={'icon icon-open'}>{'>'}</span>
                </div>
            </div>
        )
    }
}
