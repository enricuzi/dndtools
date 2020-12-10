import React, {useEffect, useMemo, useState} from "react";
import "./CharacterAttribute.css";
import Utils from "../Utils/Utils";
import Logger from "../Services/Logger";
import Events from "../../models/Events";

const CharacterAttribute = props => {

    const {id, label} = props.data
    const [value, setValue] = useState(props.data.value || 10)
    const [bonus, setBonus] = useState(Utils.getAttributeBonus(value))
    const [extra, setExtra] = useState(props.data.extra || 0)

    const logger = useMemo(() => new Logger('CharacterAttribute'), [])

    function onChange(e) {
        const {value} = e.target;
        const bonus = Utils.getAttributeBonus(value);
        setValue(value)
        setBonus(bonus)
    }

    function onChangeExtra(e) {
        const value = e.target.innerText
        !!value && setExtra(Number(value))
    }

    useEffect(() => {
        logger.log('changing attribute', id, value, bonus, extra)
        Events.publish(Events.AttributeBonusChange, {id, value, bonus, extra})
    }, [value, bonus, extra, id, logger])

    return (
        <div className={`character-attribute ${id}`}>
            <label>{label}</label>
            <input type={"number"} min={1} placeholder={label} value={value} onChange={onChange} />
            <span>{bonus}</span>
            <span contentEditable={true} suppressContentEditableWarning={true} onInput={onChangeExtra}>{extra}</span>
        </div>
    )
}

export default CharacterAttribute
