import React from "react"
import './MonsterBox.css'
import Events from "../../models/Events";
import Logger from "../Services/Logger";

const MonsterBox = props => {

    const {monster, index} = props
    const {name, hp, ca} = props.monster
    const logger = new Logger('MonsterBox')

    function changeStat(e) {
        e.preventDefault()
        const {innerText} = e.target
        const {attr} = e.target.dataset
        monster[attr] = innerText
        Events.publish(Events.MonsterStatChange, {monster, index})
    }

    function removeMonster() {
        logger.log('triggering remove', index)
        Events.publish(Events.RemoveMonster, index)
    }

    return (
        <fieldset className={'monster-box'}>
            <legend contentEditable={true} suppressContentEditableWarning={true} data-attr={'name'} onInput={changeStat}>{name}</legend>
            <div className={'row'}>
                <label>Punti Vita</label>
                <span contentEditable={true} suppressContentEditableWarning={true} data-attr={'hp'} onInput={changeStat}>{hp}</span>
            </div>
            <div className={'row'}>
                <label>Armatura</label>
                <span contentEditable={true} suppressContentEditableWarning={true} data-attr={'ca'} onInput={changeStat}>{ca}</span>
            </div>
            <div className={'action-buttons'}>
                <button className={'clear'} onClick={removeMonster}>Remove</button>
            </div>
        </fieldset>
    )
}

export default MonsterBox