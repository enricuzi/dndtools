import React, {useState} from "react"
import './PanelCenter.css'
import FreeDraw from "../FreeDraw/FreeDraw"
import NoteSection from "../NoteSection/NoteSection"
import Constants from "../../models/Constants";
import Events from "../../models/Events";
import MapLayer from "../MapLayer/MapLayer";
import CharacterStats from "../CharacterStats/CharacterStats";
import Battle from "../Battle/Battle";

const PanelCenter = props => {

    const [masterTool, setMasterTool] = useState(Constants.Tool.CHARACTER_STATS)
    const [sourceImage, setSourceImage] = useState(null)
    const [sourceAlt, setSourceAlt] = useState(null)

    Events.Tool.freeDrawSelected(() => setMasterTool(Constants.Tool.FREE_DRAW))
    Events.Tool.uploadImageSelected(image => {
        setMasterTool(Constants.Tool.UPLOAD_IMAGE)
        setSourceImage(image.src)
        setSourceAlt(image.alt)
    })
    Events.Tool.onCharacterStatsSelected(() => setMasterTool(Constants.Tool.CHARACTER_STATS))

    const {user} = props
    return (
        <div className={`panel panel-center`}>
            {user.type === Constants.User.MASTER ?
                <div className={"master-tools"}>
                    {masterTool === Constants.Tool.FREE_DRAW ? <FreeDraw /> :
                        masterTool === Constants.Tool.UPLOAD_IMAGE ? <MapLayer image={sourceImage} alt={sourceAlt} /> :
                            masterTool === Constants.Tool.CHARACTER_STATS ? <Battle /> : null}
                </div>
                : user.type === Constants.User.PLAYER ?
                    <div className={"player-tools"}>
                        <FreeDraw />
                    </div>
                    : null}
            <NoteSection />
        </div>
    )
}

export default PanelCenter