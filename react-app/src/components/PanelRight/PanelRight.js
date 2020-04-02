import UserSection from "../UserSection/UserSection";
import React, {Component} from "react";

export default class PanelRight extends Component {

	constructor(props) {
		super(props);
		this.onClickImage = this.onClickImage.bind(this);
	}

	onClickImage() {
		this.props.onClickImage && this.props.onClickImage();
	}

	render() {
		const {user, users, enlargePanelRight} = this.props;
		return (
			<div className={`panel panel-right ${enlargePanelRight}`}>
				{users.map(u => u.id !== user.id ?
					<UserSection user={u} onClickImage={this.onClickImage}/>
					: null)}
			</div>
		);
	}
}
