import React, {useEffect, useRef, useState} from "react"
import './CharacterStats.css'
import CharacterStat from "../CharacterStat/CharacterStat";
import Logger from "../Services/Logger";
import Events from "../../models/Events";

const CharacterStats = props => {

    let characters = localStorage.hasOwnProperty('characters') ? JSON.parse(localStorage.getItem('characters')) : []
    const [showNew, setShowNew] = useState(false)

    const logger = new Logger('CharacterStats')
    logger.log(characters)

    Events.Tool.onCharacterStatChange(data => {
        logger.log('Updating stat', data)
        let found = false
        characters = characters.map(character => {
            if (data.name === character.name) {
                found = true
                return data
            }
            return character
        })
        if (!found) {
            characters.push(data)
        }
    })

    function onSaveSession() {
        logger.log('Saving stats', characters)
        localStorage.setItem('characters', JSON.stringify(characters))
        setShowNew(false)
    }

    function onNewStat() {
        setShowNew(true)
    }

    return (
        <div className={'character-stats'}>
            <div className={'content'}>
                {
                    characters.map(character => <CharacterStat character={character} />)
                }
                {
                    showNew ? <CharacterStat character={{}} /> : null
                }
            </div>
            <div className={'action-buttons'}>
                <button onClick={onNewStat}>New</button>
                <button onClick={onSaveSession}>Save</button>
            </div>
        </div>
    )
}

export default CharacterStats