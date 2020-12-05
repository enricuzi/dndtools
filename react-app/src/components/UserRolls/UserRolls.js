import React from "react";
import "./UserRolls.css";
import DiceRollResult from "../DiceRollResult/DiceRollRestult";
import Logger from "../Services/Logger";

const UserRolls = props => {

    const logger = new Logger("UserRolls");
    const {rolls} = props;

    if (rolls && rolls.length) {
        logger.log("rolls", rolls);
        return (
            <div className={"user-rolls"}>
                <label>Rolls</label>
                {rolls.map((item, index) =>
                    <DiceRollResult key={index} roll={item} first={(index === 0) ? "first" : ""} />)}
            </div>
        )
    }
    return null
}

export default UserRolls
