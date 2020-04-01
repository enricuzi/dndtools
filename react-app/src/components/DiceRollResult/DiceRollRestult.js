import React from "react";
import "./DiceRollResult.css";

const DiceRollResult = props =>
	<div className={`dice-roll-result ${props.first}`}>
		<span className={"dice number"}>{props.roll.number}</span>
		<span className={"dice operator"}>d(</span>
		<span className={"dice value"}>{props.roll.value}</span>
		<span className={"dice operator"}>) + </span>
		<span className={"dice bonus"}>{props.roll.bonus}</span>
		<span className={"dice operator"}> = </span>
		<span className={"dice roll"}>{props.roll.result}</span>
	</div>
;

export default DiceRollResult;
