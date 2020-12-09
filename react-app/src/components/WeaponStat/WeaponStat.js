import React, {useCallback, useMemo, useState} from "react";
import './WeaponStat.css'
import Events from "../../models/Events";
import Logger from "../Services/Logger";
import Constants from "../../models/Constants";

const WeaponStat = props => {

    const logger = useMemo(() => new Logger('WeaponStat'), [])
    const attributes = useMemo(() => [
        Constants.Attributes.STRENGTH,
        Constants.Attributes.DEXTERITY,
        Constants.Attributes.CONSTITUTION,
        Constants.Attributes.INTELLIGENCE,
        Constants.Attributes.WISDOM,
        Constants.Attributes.CHARISMA,
    ], [])
    const {index} = props
    const [attribute, setAttribute] = useState(attributes[0])
    const value = useMemo(() => {
        return {
            name: '',
            damage: '',
            bonus: '',
            attribute: '',
        }
    }, [])
    const updateValue = useCallback(() => {
        value.attribute = attribute
    }, [attribute, value])

    function remove() {
        logger.log('removing spell', index)
        Events.publish(Events.RemoveWeapon, index)
    }

    function save(e) {
        const text = e.target.innerText
        const {attr} = e.target.dataset
        value[attr] = text
        updateValue()
        logger.log('saving', value)
        Events.publish(Events.SaveWeapon, value)
    }

    function saveAttribute(e) {
        const attribute = e.target.value
        setAttribute(attribute)
        value.attribute = attribute
        logger.log('saving', value)
        Events.publish(Events.SaveWeapon, value)
    }

    return (
        <fieldset className={'weapon-stat'}>
            <legend contentEditable={true} suppressContentEditableWarning={true} onInput={save} data-attr={'name'}>{value.name}</legend>
            <label>Damage</label>
            <span contentEditable={true} suppressContentEditableWarning={true} onInput={save} data-attr={'damage'}>{value.damage}</span>
            <label>Bonus</label>
            <span contentEditable={true} suppressContentEditableWarning={true} onInput={save} data-attr={'bonus'}>{value.bonus}</span>
            <label>Attribute</label>
            <select onChange={saveAttribute} value={attribute} data-attr={'attribute'}>
                {
                    attributes.map((attribute, index) => <option key={index} value={attribute}>{attribute}</option>)
                }
            </select>
            <div className={'action-buttons'}>
                <button className={'clear'} onClick={remove}>Remove</button>
            </div>
        </fieldset>
    )
}

export default WeaponStat