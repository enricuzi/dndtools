import React from "react";
import "./UserRolls.css";
import DiceRollResult from "../DiceRollResult/DiceRollRestult";

const UserRolls = props =>
	<div className={"user-rolls"}>
		<label>Rolls</label>
		{props.rolls && props.rolls.map((item, index) => <DiceRollResult key={index} roll={item} first={(index === 0) ? "first": ""}/>)}
	</div>
;

export default UserRolls;
