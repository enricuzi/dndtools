import React, {Component} from "react";
import "./UserSection.css";

export default class UserSection extends Component {

	constructor(props) {
		super(props);
		this.rolls = [];
		this.onClickImage = this.onClickImage.bind(this);
		this.onClearRolls = this.onClearRolls.bind(this);
	}

	onClickImage() {
		this.props.onClickImage && this.props.onClickImage();
	}

	shouldComponentUpdate(nextProps, nextState, nextContext) {
		const {user} = nextProps;
		if (user) {
			user.roll && this.rolls.push(user.roll);
			return true;
		}
		return false;
	}

	onClearRolls() {
		this.rolls = [];
		this.props.onClearRolls && this.props.onClearRolls()
	}

	render() {
		const {user} = this.props;
		return (
			<div className={`user-section section-${user.id}`}>
				<fieldset>
					<legend>{user.id}</legend>
					{this.rolls.length > 0 ? <button onClick={this.onClearRolls}>Clear</button> : null}
					{this.rolls.map((item, index) => {
						const {value, number, bonus, roll} = item;
						return (
								<div key={index} className={"rolls"}>
									<span className={"dice number"}>{number}</span>
									<span className={"dice operator"}>d(</span>
									<span className={"dice value"}>{value}</span>
									<span className={"dice operator"}>) + </span>
									<span className={"dice bonus"}>{bonus}</span>
									<span className={"dice operator"}> = </span>
									<span className={"dice roll"}>{roll}</span>
								</div>
							)
						}
					)}
					{user.image ? <img alt={`Remote ${user.id}`} src={user.image} onClick={this.onClickImage}/> : null}
				</fieldset>
			</div>
		);
	}
}
