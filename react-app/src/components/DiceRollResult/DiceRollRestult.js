import React from "react";
import "./DiceRollResult.css";

const DiceRollResult = props => {
    if (props.first) {
        return (
            <div className={`dice-roll-result ${props.first}`}>
                <div className={'value'}>
                    <span className={"dice roll"}>{props.roll.result}</span>
                </div>
                <div className={'details'}>
                    <span className={"dice number"}>{props.roll.number}</span>
                    <span className={"dice operator"}>d(</span>
                    <span className={"dice dice"}>{props.roll.value}</span>
                    <span className={"dice operator"}>) + </span>
                    <span className={"dice bonus"}>{props.roll.bonus}</span>
                </div>
            </div>
        )
    }
    return (
        <div className={`dice-roll-result`}>
            <span className={"dice number"}>{props.roll.number}</span>
            <span className={"dice operator"}>d(</span>
            <span className={"dice dice"}>{props.roll.value}</span>
            <span className={"dice operator"}>) + </span>
            <span className={"dice bonus"}>{props.roll.bonus}</span>
            <span className={"dice operator"}> = </span>
            <span className={"dice roll"}>{props.roll.result}</span>
        </div>
    )
}

export default DiceRollResult;
