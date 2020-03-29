import React, {Component} from "react";
import "./CharacterSheet.css";
import Storage from "../Services/Storage";

export default class CharacterSheet extends Component {

	constructor(props) {
		super(props);
		this.state = {
			value: Storage.getItem("character", localStorage)
		};
		this.onInput = this.onInput.bind(this);
		this.onSaveText = this.onSaveText.bind(this);
		this.onClearText = this.onClearText.bind(this);
	}

	onInput() {
		const {value} = this.content;
		this.setState({value});
	}

	onSaveText(e) {
		const {value} = this.content;
		Storage.save("character", value, localStorage);
	}

	onClearText(e) {
		this.content.value = ""
	}

	componentDidMount() {
		this.user = this.props.user;
	}

	render() {
		const {value} = this.state;
		return (
			<div className={"character-sheet"}>
				<label>Character</label>
				<textarea value={value} onInput={this.onInput} ref={ref => this.content = ref}/>
				<button onClick={this.onClearText}>Clear</button>
				<button onClick={this.onSaveText}>Save</button>
			</div>
		)
	}
}
