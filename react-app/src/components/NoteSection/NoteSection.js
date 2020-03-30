import React, {Component} from "react";
import "./NoteSection.css";
import Storage from "../Services/Storage";

export default class NoteSection extends Component {

	constructor(props) {
		super(props);
		this.state = {
			value: Storage.getItem("note", localStorage)
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
		Storage.save("note", value, localStorage);
	}

	onClearText(e) {
		this.content.value = ""
	}

	render() {
		const {value} = this.state;
		return (
			<div className={"note-section"}>
				<label>Note</label>
				<textarea value={value} onInput={this.onInput} ref={ref => this.content = ref}/>
				<div className={"actions"}>
					<button className={"clear"} onClick={this.onClearText}>Clear</button>
					<button className={"save"} onClick={this.onSaveText}>Save</button>
				</div>
			</div>
		)
	}
}
