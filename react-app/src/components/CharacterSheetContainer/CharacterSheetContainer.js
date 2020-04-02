import React, {Component} from "react";
import "./CharacterSheetContainer.css";
import Storage from "../Services/Storage";
import CharacterFeature from "../CharacterFeature/CharacterFeature";

export default class CharacterSheetContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			character: Storage.getItem("character") || {
				features: [
					{id: "str", label: "Strength"},
					{id: "dex", label: "Dexterity"},
					{id: "con", label: "Constitution"},
					{id: "int", label: "Intelligence"},
					{id: "wis", label: "Wisdom"},
					{id: "cha", label: "Charisma"},
				],
				extra: ""
			}
		};
		this.setText = this.setText.bind(this);
		this.saveText = this.saveText.bind(this);
		this.clearText = this.clearText.bind(this);
		this.setFeature = this.setFeature.bind(this);
		this.saveFeatures = this.saveFeatures.bind(this);
	}

	setText() {
		const {value} = this.extra;
		const {character} = this.state;
		character.extra = value;
		this.setState({character});
	}

	saveText() {
		const {value} = this.extra;
		const character = this.state;
		character.extra = value;
		Storage.save("character", character);
	}

	clearText(e) {
		this.extra.value = ""
	}

	setFeature(feat) {
		const {features} = this.state.character;
		features.find(item => item.id === feat.id).value = feat.value;
		Storage.save("character", this.state.character);
	}

	saveFeatures() {}

	render() {
		const {extra, features} = this.state.character;
		return (
			<div className={"character-sheet"}>
				<label>Character</label>
				<div className={"features"}>
					{features.map((item, index) => {
						const {id, label, value} = item;
						return (<CharacterFeature key={index} id={id} label={label} value={value} onChange={this.setFeature}/>)
					})}
					<button className={"save"}>Save</button>
				</div>
				<textarea value={extra} onInput={this.setText} ref={ref => this.extra = ref}/>
				<button className={"clear"} onClick={this.clearText}>Clear</button>
				<button className={"save"} onClick={this.saveText}>Save</button>
			</div>
		)
	}
}
