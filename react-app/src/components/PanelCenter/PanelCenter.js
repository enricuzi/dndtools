import React, {Component} from "react"
import './PanelCenter.css'
import MapLayer from "../MapLayer/MapLayer"
import FreeDraw from "../FreeDraw/FreeDraw"
import NoteSection from "../NoteSection/NoteSection"
import Constants from "../../models/Constants";
import Events from "../../models/Events";

export default class PanelCenter extends Component {

    constructor(props) {
        super(props)
        this.onSendImage = this.onSendImage.bind(this)
        this.onMapSelected = this.onMapSelected.bind(this)

        Events.Tool.freeDrawSelected(() => this.setState({
            masterTool: Constants.Tool.FREE_DRAW
        }))
        Events.Tool.uploadImageSelected(image => this.setState({
            masterTool: Constants.Tool.UPLOAD_IMAGE,
            sourceImage: image.src,
            sourceAlt: image.alt
        }))
    }

    onSendImage(image) {
        this.props.onSendImage && this.props.onSendImage(image)
    }

    onMapSelected(image) {
        this.props.onMapSelected && this.props.onMapSelected(image)
    }

    render() {
        const {user} = this.props
        const {sourceImage, sourceAlt, masterTool} = this.state || {}
        return (
            <div className={`panel panel-center`}>
                {user.type === Constants.User.MASTER ?
                    <div className={"master-tools"}>
                        {masterTool === Constants.Tool.FREE_DRAW ?
                            <FreeDraw onSendImage={this.onSendImage}/> :
                            masterTool === Constants.Tool.UPLOAD_IMAGE ?
                                <MapLayer image={sourceImage} alt={sourceAlt} onSendImage={this.onSendImage}/> : null}
                    </div>
                    : user.type === Constants.User.PLAYER ?
                        <div className={"player-tools"}>
                            <FreeDraw onSendImage={this.onSendImage}/>
                        </div>
                        : null}
                <NoteSection/>
            </div>
        )
    }
}
