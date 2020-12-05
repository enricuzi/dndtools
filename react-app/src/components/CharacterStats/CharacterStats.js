import React, {useEffect, useState} from "react"
import './CharacterStats.css'
import CharacterStat from "../CharacterStat/CharacterStat";
import Logger from "../Services/Logger";
import Events from "../../models/Events";
import Storage from "../Services/Storage";

const CharacterStats = props => {

    let characters = Storage.contains('characters') ? Storage.getItem('characters') : []
    const [showNew, setShowNew] = useState(false)

    const logger = new Logger('CharacterStats')
    logger.log(characters)

    useEffect(() => {
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
    }, [])

    function onSaveCharacters() {
        logger.log('Saving stats', characters)
        Storage.save('characters', characters)
        setShowNew(false)
    }

    function onNewStat() {
        setShowNew(true)
    }

    return (
        <div className={'character-stats'}>
            <div className={'content'}>
                {
                    characters.map((character, index) => <CharacterStat key={index} character={character} />)
                }
                {
                    showNew ? <CharacterStat character={{}} /> : null
                }
            </div>
            <div className={'action-buttons'}>
                <button onClick={onNewStat}>New</button>
                <button className={'save'} onClick={onSaveCharacters}>Save</button>
            </div>
        </div>
    )
}

export default CharacterStats