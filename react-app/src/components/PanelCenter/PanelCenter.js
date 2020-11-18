import React, {Component} from "react"
import './PanelCenter.css'
import MapLayer from "../MapLayer/MapLayer"
import BaldursGateMaps from "../BaldursGateMaps/BaldursGateMaps"
import FreeDraw from "../FreeDraw/FreeDraw"
import NoteSection from "../NoteSection/NoteSection"
import Events from "../../models/Events"
import Constants from "../../models/Constants"

export default class PanelCenter extends Component {

    constructor(props) {
        super(props)
        this.onSendImage = this.onSendImage.bind(this)
        this.onMapSelected = this.onMapSelected.bind(this)

        this.state = {
            panelState: ''
        }
    }

    componentDidMount() {
        Events.PanelState.panelLeftClosed(() => this.setState({panelState: Constants.FULL_WIDTH}))
        Events.PanelState.panelLeftOpened(() => this.setState({panelState: ''}))
    }

    onSendImage(image) {
        this.props.onSendImage && this.props.onSendImage(image)
    }

    onMapSelected(image) {
        this.props.onMapSelected && this.props.onMapSelected(image)
    }

    render() {
        const {user, sourceImage, sourceAlt, masterTool, deltaLeft} = this.props
        const {panelState} = this.state
        return (
            <div className={`panel panel-center ${panelState}`}>
                {user.type === "master" ?
                    <div className={"master-tools"}>
                        {sourceImage ?
                            <MapLayer image={sourceImage} alt={sourceAlt} onSendImage={this.onSendImage} deltaLeft={deltaLeft}/> : null}
                        {masterTool === "baldursFateMaps" ?
                            <BaldursGateMaps onMapSelected={this.onMapSelected}/> : null}
                        {masterTool === "freeDraw" ?
                            <FreeDraw onSendImage={this.onSendImage} deltaLeft={deltaLeft}/> : null}
                    </div>
                    : null}
                {user.type === "player" ?
                    <div className={"player-tools"}>
                        <FreeDraw onSendImage={this.onSendImage}/>
                    </div>
                    : null}
                <NoteSection/>
            </div>
        )
    }
}
