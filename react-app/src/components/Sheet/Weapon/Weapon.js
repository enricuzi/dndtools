import React, {useEffect, useMemo, useRef, useState} from "react";
import './Weapon.css'
import Events from "../../../models/Events";
import Logger from "../../Services/Logger";
import Constants from "../../../models/Constants";
import Utils from "../../Utils/Utils";

const Weapon = props => {

    const logger = useMemo(() => new Logger('Weapon'), [])
    const attributes = useMemo(() => [
        Constants.Attributes.STRENGTH,
        Constants.Attributes.DEXTERITY,
        Constants.Attributes.CONSTITUTION,
        Constants.Attributes.INTELLIGENCE,
        Constants.Attributes.WISDOM,
        Constants.Attributes.CHARISMA,
    ], [])
    const {index} = props
    const [data, setData] = useState(props.data)
    const targetRef = useRef(null)
    let timer = useRef(0)

    useEffect(() => {
        clearTimeout(timer.current)
        timer.current = Utils.delay(500, () => {
            logger.log('sending saving weapon', data)
            Events.publish(Events.SaveWeapon, {...data, index})
        })
    }, [logger, index, data])

    useEffect(() => {
        const target = targetRef.current
        if (target && target.innerText.length) {
            Utils.setCursor(target)
        }
    }, [targetRef, data])

    function remove() {
        logger.log('removing spell', index)
        Events.publish(Events.RemoveWeapon, index)
    }

    function setName(e) {
        const value = e.target.innerText
        setData({
            name: value,
            damage: data.damage,
            bonus: data.bonus,
            attribute: data.attribute || Constants.Attributes.STRENGTH
        })
    }

    function setDamage(e) {
        const value = e.target.innerText
        setData({
            name: data.name,
            damage: value,
            bonus: data.bonus,
            attribute: data.attribute || Constants.Attributes.STRENGTH
        })
    }

    function setBonus(e) {
        const value = e.target.innerText
        setData({
            name: data.name,
            damage: data.damage,
            bonus: value,
            attribute: data.attribute || Constants.Attributes.STRENGTH
        })
    }

    function setAttribute(e) {
        const value = e.target.value
        setData({
            name: data.name,
            damage: data.damage,
            bonus: data.bonus,
            attribute: value
        })
    }

    function onFocus(e) {
        targetRef.current = e.target
        Utils.setCursor(e.target)
    }

    return (
        <fieldset className={'weapon-stat'}>
            <legend contentEditable={true} suppressContentEditableWarning={true} onInput={setName} onFocus={onFocus}>{data.name}</legend>
            <label>Damage</label>
            <span contentEditable={true} suppressContentEditableWarning={true} onInput={setDamage} onFocus={onFocus}>{data.damage}</span>
            <label>Bonus</label>
            <span contentEditable={true} suppressContentEditableWarning={true} onInput={setBonus} onFocus={onFocus}>{data.bonus}</span>
            <label>Attribute</label>
            <select onChange={setAttribute} value={data.attribute} data-attr={'attribute'}>
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

export default Weapon