import React, {useEffect, useState} from "react"
import './CharacterStats.css'
import CharacterStat from "../CharacterStat/CharacterStat";
import Logger from "../Services/Logger";
import Events from "../../models/Events";
import Storage from "../Services/Storage";

const CharacterStats = props => {

    const [characters, setCharacter] = useState(Storage.getItem('characters') || [{}])

    const logger = new Logger('CharacterStats')
    logger.log(characters)

    useEffect(() => {
        const observableStatChange = Events.Tool.onCharacterStatChange(data => {
            logger.log('Updating stat', data)
            setCharacter(characters.map((character, index) => index === data.index ? data.character : character))
        })
        const observableRemoveCharacter = Events.Tool.onCharacterRemove(data => {
            logger.log('Remove index', data)
            const list = characters.filter((character, index) => data !== index)
            setCharacter(list.length ? list : [{}])
        })
        return () => {
            observableStatChange.unsubscribe()
            observableRemoveCharacter.unsubscribe()
        }
    }, [characters])

    function onSaveCharacters() {
        logger.log('Saving stats', characters)
        Storage.save('characters', characters)
    }

    function onNewStat() {
        setCharacter([...characters, {}])
    }

    return (
        <div className={'character-stats'}>
            <div className={'content'}>
                {
                    characters.map((character, index) => <CharacterStat key={index} character={character} index={index} />)
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