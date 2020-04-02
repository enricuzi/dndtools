import React, {Component} from "react";
import "./UserRolls.css";
import DiceRollResult from "../DiceRollResult/DiceRollRestult";
import Logger from "../Services/Logger";

export default class UserRolls extends Component {

	constructor(props) {
		super(props);
		this.logger = new Logger("UserRolls");
	}

	render() {
		const {rolls} = this.props;
		this.logger.log("rolls", rolls);
		if (rolls && rolls.length) {
			return (
				<div className={"user-rolls"}>
					<label>Rolls</label>
					{rolls.map((item, index) => <DiceRollResult key={index} roll={item} first={(index === 0) ? "first" : ""}/>)}
				</div>
			)
		}
		return null
	}
}
