import React, {Component} from "react";
import DiceRoller from "../DiceRoller/DiceRoller";
import CharacterSheetContainer from "../CharacterSheetContainer/CharacterSheetContainer";

export default class PanelLeft extends Component {

	constructor(props) {
		super(props);
		this.onRoll = this.onRoll.bind(this);
	}

	onRoll(roll) {
		this.props.onRoll && this.props.onRoll(roll);
	}

	render() {
		const {user} = this.props;
		return (
			<div className={"panel panel-left"}>
				<DiceRoller onRoll={this.onRoll} rolls={user.rolls}/>
				{user.type === "player" ?
					<CharacterSheetContainer/>
					: null}
			</div>
		);
	}
}
