import React, {useEffect, useMemo, useRef, useState} from "react"
import './CharacterStats.css'
import CharacterStat from "../CharacterStat/CharacterStat";
import Logger from "../Services/Logger";
import Events from "../../models/Events";
import Storage from "../Services/Storage";

const CharacterStats = props => {

    const [characters, setCharacter] = useState(Storage.getItem('characters') || [{}])
    const tempList = useRef(characters)
    const logger = useMemo(() => new Logger('CharacterStats'), [])
    logger.log('loading characters', characters)

    useEffect(() => {
        const observable = Events.Tool.onCharacterStatChange(data => {
            logger.log('Updating stat', data)
            tempList.current = tempList.current.map((character, index) => index === data.index ? data.character : character)
        })
        return () => observable.unsubscribe()
    }, [logger])

    useEffect(() => {
        const observable = Events.Tool.onCharacterRemove(data => {
            logger.log('Remove index', data)
            const list = characters.filter((character, index) => data !== index)
            setCharacter(list.length ? list : [{}])
        })
        return () => observable.unsubscribe()
    }, [characters, logger])

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