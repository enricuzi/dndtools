import React, {Component} from "react";
import "./UserSection.css";
import UserRolls from "../UserRolls/UserRolls";

export default class UserSection extends Component {

	constructor(props) {
		super(props);
		this.onClickImage = this.onClickImage.bind(this);
	}

	onClickImage() {
		this.props.onClickImage && this.props.onClickImage();
	}

	render() {
		const {user} = this.props;
		return (
			<div className={`user-section section-${user.id}`}>
				<fieldset>
					<legend>{user.id}</legend>
					<UserRolls rolls={user.rolls}/>
					{user.image ? <img alt={`Remote ${user.id}`} src={user.image} onClick={this.onClickImage}/> : null}
				</fieldset>
			</div>
		);
	}
}
