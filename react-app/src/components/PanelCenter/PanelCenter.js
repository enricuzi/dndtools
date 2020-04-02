import React, {Component} from "react";
import MapLayer from "../MapLayer/MapLayer";
import BaldursGateMaps from "../BaldursGateMaps/BaldursGateMaps";
import FreeDraw from "../FreeDraw/FreeDraw";
import NoteSection from "../NoteSection/NoteSection";
import Services from "../Services/Services";

export default class PanelCenter extends Component {

	constructor(props) {
		super(props);
		this.onSendImage = this.onSendImage.bind(this);
		this.onMapSelected = this.onMapSelected.bind(this);
	}

	onSendImage(image) {
		this.props.onSendImage && this.props.onSendImage(image);
	}

	onMapSelected(image) {
		this.props.onMapSelected && this.props.onMapSelected(image);
	}

	render() {
		const {user, sourceImage, sourceAlt, masterTool} = this.props;
		return (
			<div className={"panel panel-center"}>
				{user.type === "master" ?
					<div className={"master-tools"}>
						{sourceImage ?
							<MapLayer image={sourceImage} alt={sourceAlt} onSendImage={this.onSendImage}/> : null}
						{masterTool === "baldursFateMaps" ?
							<BaldursGateMaps onMapSelected={this.onMapSelected}/> : null}
						{masterTool === "freeDraw" ?
							<FreeDraw onSendImage={this.onSendImage}/> : null}
					</div>
					: null}
				{user.type === "player" ?
					<div className={"player-tools"}>
						<FreeDraw onSendImage={this.onSendImage}/>
					</div>
					: null}
				<NoteSection/>
			</div>
		);
	}
}
