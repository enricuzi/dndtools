import React, {useMemo} from "react";
import Constants from "../../models/Constants";
import CharacterAttribute from "../CharacterAttribute/CharacterAttribute";

const CharacterAttributes = props => {

    const attributes = useMemo(() => [
        {id: Constants.Attributes.STRENGTH, label: "STR"},
        {id: Constants.Attributes.DEXTERITY, label: "DEX"},
        {id: Constants.Attributes.CONSTITUTION, label: "CON"},
        {id: Constants.Attributes.INTELLIGENCE, label: "INT"},
        {id: Constants.Attributes.WISDOM, label: "WIS"},
        {id: Constants.Attributes.CHARISMA, label: "CHA"},
    ], [])

    return (
        <fieldset className={"character-attributes"}>
            <legend>Attributes</legend>
            {attributes.map((item, index) => {
                const {id, label, value} = item;
                return <CharacterAttribute key={index} id={id} label={label} value={value} />
            })}
            <div className={'action-buttons'}>
                <button className={"save"}>Save</button>
            </div>
        </fieldset>
    )
}

export default CharacterAttributes