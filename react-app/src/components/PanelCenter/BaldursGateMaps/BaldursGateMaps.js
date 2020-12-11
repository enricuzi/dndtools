import React, {Component} from "react";
import northWestGate from "../../../resources/north-west-gate.jpg";
import northEastGate from "../../../resources/north-east-gate.jpg";
import northGate from "../../../resources/north-gate.jpg";
import westGate from "../../../resources/west-gate.jpg";
import centralGate from "../../../resources/central-gate.jpg";
import eastGate from "../../../resources/east-gate.jpg";
import southWestGate from "../../../resources/south-west-gate.jpg";
import southGate from "../../../resources/south-gate.jpg";
import southEastGate from "../../../resources/south-east-gate.jpg";
import fullMap from "../../../resources/full-map.jpg";
import "./BaldursGateMaps.css";

export default class BaldursGateMaps extends Component {

	constructor(props) {
		super(props);
		this.fullMap = {alt: "Full Map", src: fullMap};
		this.list = [
			{alt: "North West Gate", src: northWestGate},
			{alt: "North Gate", src: northGate},
			{alt: "North Est Gate", src: northEastGate},
			{alt: "West Gate", src: westGate},
			{alt: "Central Gate", src: centralGate},
			{alt: "Est Gate", src: eastGate},
			{alt: "South West Gate", src: southWestGate},
			{alt: "South Gate", src: southGate},
			{alt: "South East Gate", src: southEastGate}
		];
	}

	render() {
		return (
			<div className={"map-list"}>
				<ul>
					{this.list.map((item, index) =>
						<li key={index} onClick={() => this.props.onMapSelected(item)}>
							<img id={`map-${index}`} alt={item.alt} src={item.src}/>
						</li>
					)}
				</ul>
				<img alt={this.fullMap.alt} src={this.fullMap.src}/>
			</div>
		)
	}
}
