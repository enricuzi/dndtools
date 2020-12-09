import React, {useMemo, useState} from "react"
import './SpellStat.css'
import Events from "../../models/Events";
import Logger from "../Services/Logger";

const SpellStat = props => {

    const logger = useMemo(() => new Logger('SpellStat'), [])
    const {index} = props
    const value = {
        name: '',
        damage: '',
        target: '',
        description: ''
    }

    function remove() {
        logger.log('removing spell', index)
        Events.Character.publish(Events.Character.REMOVE_SPELL, {value: index})
    }

    function save(e) {
        const text = e.target.innerText
        const {attr} = e.target.dataset
        value[attr] = text
        logger.log('saving spell', value)
        Events.Character.publish(Events.Character.SAVE_SPELL, {value})
    }

    return (
        <fieldset className={'spell-stat'}>
            <legend contentEditable={true} suppressContentEditableWarning={true} onInput={save} data-attr={'name'}>{value.name}</legend>
            <label>Damage</label>
            <span contentEditable={true} suppressContentEditableWarning={true} onInput={save} data-attr={'damage'}>{value.damage}</span>
            <label>Target</label>
            <span contentEditable={true} suppressContentEditableWarning={true} onInput={save} data-attr={'target'}>{value.target}</span>
            <label>Description</label>
            <textarea rows={5} contentEditable={true} suppressContentEditableWarning={true} onInput={save} data-attr={'description'}>{value.description}</textarea>
            <div className={'action-buttons'}>
                <button className={'clear'} onClick={remove}>Remove</button>
            </div>
        </fieldset>
    )
}

export default SpellStat