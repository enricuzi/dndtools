import React from "react"
import './MonsterStat.css'
import Events from "../../models/Events";
import Logger from "../Services/Logger";

const MonsterStat = props => {

    const {monster, index} = props
    const {name, hp, ca} = props.monster
    const logger = new Logger('MonsterStat')

    function changeStat(e) {
        e.preventDefault()
        const {innerText} = e.target
        const {attr} = e.target.dataset
        monster[attr] = innerText
        Events.Tool.publish(Events.Tool.MONSTER_STAT_CHANGE, {value: {monster, index}})
    }

    function removeMonster() {
        logger.log('triggering remove', index)
        Events.Tool.publish(Events.Tool.REMOVE_MONSTER, {value: index})
        // props.onRemoveMonster(index)
    }

    return (
        <div className={'monster-stat'}>
            <div className={'column'}>
                <div className={'row'}>
                    <label contentEditable={true} suppressContentEditableWarning={true} data-attr={'name'} onInput={changeStat}>{name || '-'}</label>
                </div>
                <div className={'row'}>
                    <label>Punti Vita</label>
                    <span contentEditable={true} suppressContentEditableWarning={true} data-attr={'hp'} onInput={changeStat}>{hp || '-'}</span>
                </div>
                <div className={'row'}>
                    <label>Armatura</label>
                    <span contentEditable={true} suppressContentEditableWarning={true} data-attr={'ca'} onInput={changeStat}>{ca || '-'}</span>
                </div>
                <div className={'row'}>
                    <button onClick={removeMonster}>Remove</button>
                </div>
            </div>
        </div>
    )
}

export default MonsterStat