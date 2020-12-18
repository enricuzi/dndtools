import React, {useEffect, useMemo, useState} from "react";
import Constants from "../../../models/Constants";
import Attribute from "../Attribute/Attribute";
import Storage from "../../Services/Storage";
import Events from "../../../models/Events";
import Logger from "../../Services/Logger";

const Attributes = props => {

    const logger = useMemo(() => new Logger('Attributes'), [])
    const {character} = props
    const [attributes, setAttributes] = useState(Storage.getFilteredItem('attributes', character))

    useEffect(() => {
        if (!attributes || !attributes.length) {
            setAttributes({
                [Constants.Attributes.STRENGTH]: {value: 10, extra: 0},
                [Constants.Attributes.DEXTERITY]: {value: 10, extra: 0},
                [Constants.Attributes.CONSTITUTION]: {value: 10, extra: 0},
                [Constants.Attributes.INTELLIGENCE]: {value: 10, extra: 0},
                [Constants.Attributes.WISDOM]: {value: 10, extra: 0},
                [Constants.Attributes.CHARISMA]: {value: 10, extra: 0},
            })
        }
    }, [])

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
                Storage.saveFilteredItem('attributes', character, attributes)
            }
        })
        return () => {
            observer.unsubscribe()
        }
    }, [logger, character, attributes])

    return (
        <fieldset className={"character-attributes"}>
            <legend>Attributes</legend>
            {attributes && Object.keys(attributes).map((key, index) => {
                const attribute = attributes[key]
                const {value, extra} = attribute
                return <Attribute key={index} data={{id: key, label: key.substr(0, 3), value, extra}} />
            })}
        </fieldset>
    )
}

export default Attributes