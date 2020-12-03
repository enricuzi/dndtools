import React, {useState} from "react"
import './CharacterStat.css'
import Logger from "../Services/Logger";
import Events from "../../models/Events";

const CharacterStat = props => {

    const {character} = props
    const {name, hp, ca, at} = character

    const logger = new Logger('CharacterStat')
    logger.log(character)

    function changeStat(e) {
        e.preventDefault()
        const {innerText} = e.target
        const {attr} = e.target.dataset
        character[attr] = innerText
        Events.Tool.publish(Events.Tool.CHARACTER_STAT_CHANGE, {value: character})
    }

    return (
        <div className={'character-stat'}>
            <div className={'column'}>
                <div className={'row'}>
                    <label contentEditable={true} data-attr={'name'} onInput={changeStat}>{name || '-'}</label>
                </div>
                <div className={'row'}>
                    <label>Punti Vita</label>
                    <span contentEditable={true} data-attr={'hp'} onInput={changeStat}>{hp || '-'}</span>
                </div>
                <div className={'row'}>
                    <label>Armatura</label>
                    <span contentEditable={true} data-attr={'ca'} onInput={changeStat}>{ca || '-'}</span>
                </div>
                <div className={'row'}>
                    <label>Attacco</label>
                    <span contentEditable={true} data-attr={'at'} onInput={changeStat}>{at || '-'}</span>
                </div>
            </div>
        </div>
    )
}

export default CharacterStat