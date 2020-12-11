import React, {useEffect, useMemo} from "react";
import Constants from "../../../models/Constants";
import Attribute from "../Attribute/Attribute";
import Storage from "../../Services/Storage";
import Events from "../../../models/Events";
import Logger from "../../Services/Logger";

const Attributes = props => {

    const logger = useMemo(() => new Logger('Attributes'), [])
    const {character} = props
    const labels = useMemo(() => [
        {id: Constants.Attributes.STRENGTH, label: "STR"},
        {id: Constants.Attributes.DEXTERITY, label: "DEX"},
        {id: Constants.Attributes.CONSTITUTION, label: "CON"},
        {id: Constants.Attributes.INTELLIGENCE, label: "INT"},
        {id: Constants.Attributes.WISDOM, label: "WIS"},
        {id: Constants.Attributes.CHARISMA, label: "CHA"},
    ], [])
    const attributes = useMemo(() => Storage.filterItem('attributes', character) || {
        [Constants.Attributes.STRENGTH]: {value: 10, extra: 0},
        [Constants.Attributes.DEXTERITY]: {value: 10, extra: 0},
        [Constants.Attributes.CONSTITUTION]: {value: 10, extra: 0},
        [Constants.Attributes.INTELLIGENCE]: {value: 10, extra: 0},
        [Constants.Attributes.WISDOM]: {value: 10, extra: 0},
        [Constants.Attributes.CHARISMA]: {value: 10, extra: 0},
    }, [character])

    useEffect(() => {
        const observer = Events.onAttributeBonusChange(data => {
            if (!character) {
                logger.log('no character defined')
            } else {
                attributes[data.id] = {
                    value: data.value,
                    bonus: data.bonus,
                    extra: data.extra
                }
                logger.log('saving attributes', attributes)
                Storage.updateItem('attributes', character, attributes)
            }
        })
        return () => {
            observer.unsubscribe()
        }
    }, [logger, character, attributes])

    return (
        <fieldset className={"character-attributes"}>
            <legend>Attributes</legend>
            {labels.map((item, index) => {
                const {id, label} = item;
                const {value, extra} = attributes[id]
                return <Attribute key={index} data={{id, label, value, extra}} />
            })}
        </fieldset>
    )
}

export default Attributes