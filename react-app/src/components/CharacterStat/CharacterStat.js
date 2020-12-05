import React, {useState} from "react"
import './CharacterStat.css'
import Logger from "../Services/Logger";
import Events from "../../models/Events";
import Utils from "../Utils/Utils";

const CharacterStat = props => {

    const {character} = props
    const {name, hp, ca, bonus, dmg, dmgBonus} = character

    const [attack, setAttack] = useState(null)
    const [ability, setAbility] = useState(null)

    function changeStat(e) {
        e.preventDefault()
        const {innerText} = e.target
        const {attr} = e.target.dataset
        character[attr] = innerText
        Events.Tool.publish(Events.Tool.CHARACTER_STAT_CHANGE, {value: character})
    }

    function onAttackRoll() {
        const attackValue = Utils.roll() + Number(bonus)
        const damageValue = Utils.roll(dmg) + Number(dmgBonus)
        setAttack(attackValue + ',' + damageValue)
    }

    function onAbilityRoll() {
        const value = Utils.roll() + Number(bonus)
        setAbility(value)
    }

    return (
        <div className={'character-stat'}>
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
                    <label>Bonus Classe</label>
                    <span contentEditable={true} suppressContentEditableWarning={true} data-attr={'bonus'} onInput={changeStat}>{bonus || '-'}</span>
                </div>
                <div className={'row'}>
                    <div className={'column'}>
                        <div className={'row'}>
                            <label>Danno</label>
                            <span contentEditable={true} suppressContentEditableWarning={true} data-attr={'dmg'} onInput={changeStat}>{dmg || '-'}</span>
                        </div>
                        <div className={'row'}>
                            <label>Bonus</label>
                            <span contentEditable={true} suppressContentEditableWarning={true} data-attr={'dmgBonus'} onInput={changeStat}>{dmgBonus || '-'}</span>
                        </div>
                    </div>
                </div>
                <div className={'row'}>
                    <button onClick={onAttackRoll}>Attacco</button>
                    <span>{attack}</span>
                </div>
                <div className={'row'}>
                    <button onClick={onAbilityRoll}>Abilità</button>
                    <span>{ability}</span>
                </div>
            </div>
        </div>
    )
}

export default CharacterStat