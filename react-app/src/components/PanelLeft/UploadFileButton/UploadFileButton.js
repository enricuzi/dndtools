import React, {Component} from "react";
import "./UploadFileButton.css";

export default class UploadFileButton extends Component {

	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
		this.onChangeFile = this.onChangeFile.bind(this);
	}

	onClick() {
		this.input.click();
	}

	onChangeFile(e) {
		const file = e.target.files[0];
		const title = window.prompt("Set image title");
		// FileReader support
		const fileReader = new FileReader();
		fileReader.onload = () => {
			this.props.onChange && this.props.onChange({
				src: fileReader.result,
				alt: title
			});
		};
		fileReader.readAsDataURL(file);
	}

	render() {
		const {children} = this.props;
		return (
			<button className={"upload-file"} onClick={this.onClick}>
				<span>{children}</span>
				<input ref={ref => this.input = ref} type={"file"} onChange={this.onChangeFile}/>
			</button>
		)
	}
}
