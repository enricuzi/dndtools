import React, {Component} from "react";
import "./UserSection.css";

export default class UserSection extends Component {

	render() {
		const {user} = this.props;
		const {value, number, bonus, roll} = user.roll || {};
		return (
			<div className={`user-section section-${user.id}`}>
				<fieldset>
					<legend>{user.id}</legend>
					{user.roll ?
						<div className={"rolls"}>
							<span className={"dice number"}>{number}</span>
							<span className={"dice operator"}>+</span>
							<span className={"dice value"}>{value}</span>
							<span className={"dice operator"}>+</span>
							<span className={"dice bonus"}>{bonus}</span>
							<span className={"dice operator"}>=</span>
							<span className={"dice roll"}>{roll}</span>
						</div>
						: null
					}
					{user.image ? <img alt={"User image"} src={user.image}/> : null}
				</fieldset>
			</div>
		);
	}
}
