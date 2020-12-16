import React, {useEffect, useMemo, useRef, useState} from "react"
import './Spell.css'
import Events from "../../../models/Events";
import Logger from "../../Services/Logger";
import Utils from "../../Utils/Utils";

const Spell = props => {

    const logger = useMemo(() => new Logger('Spell'), [])
    const {index} = props
    const [data, setData] = useState(props.data)
    const targetRef = useRef(null)
    const timer = useRef(0)

    useEffect(() => {
        clearTimeout(timer.current)
        timer.current = Utils.delay(500, () => {
            logger.log('sending saving spell', data)
            Events.publish(Events.SaveSpell, {...data, index})
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
        Events.publish(Events.RemoveSpell, index)
    }

    function setName(e) {
        const value = e.target.innerText
        setData({
            name: value,
            damage: data.damage,
            target: data.target,
            description: data.description
        })
    }

    function setTarget(e) {
        const value = e.target.innerText
        setData({
            name: data.name,
            damage: data.damage,
            target: value,
            description: data.description
        })
    }

    function setDamage(e) {
        const value = e.target.innerText
        setData({
            name: data.name,
            damage: value,
            target: data.target,
            description: data.description
        })
    }

    function setDescription(e) {
        const value = e.target.value
        setData({
            name: data.name,
            damage: data.damage,
            target: data.target,
            description: value
        })
    }

    function onFocus(e) {
        targetRef.current = e.target
        Utils.setCursor(e.target)
    }

    return (
        <fieldset className={'spell-stat'}>
            <legend contentEditable={true} suppressContentEditableWarning={true} onInput={setName} onFocus={onFocus}>{data.name}</legend>
            <label>Damage</label>
            <span contentEditable={true} suppressContentEditableWarning={true} onInput={setDamage} onFocus={onFocus}>{data.damage}</span>
            <label>Target</label>
            <span contentEditable={true} suppressContentEditableWarning={true} onInput={setTarget} onFocus={onFocus}>{data.target}</span>
            <label>Description</label>
            <textarea rows={5} value={data.description} onChange={setDescription} />
            <div className={'action-buttons'}>
                <button className={'clear'} onClick={remove}>Remove</button>
            </div>
        </fieldset>
    )
}

export default Spell