import React, {useCallback, useEffect, useMemo, useRef, useState} from "react"
import './CharacterBoxes.css'
import CharacterBox from "../CharacterBox/CharacterBox";
import Logger from "../../Services/Logger";
import Events from "../../../models/Events";
import Storage from "../../Services/Storage";
import Constants from "../../../models/Constants";

const CharacterBoxes = props => {

    const [characters, setCharacters] = useState(Storage.getItem(Constants.Storage.CHARACTER_BOXES) || [{}])
    const tempList = useRef(characters)
    const logger = useMemo(() => new Logger('CharacterBoxes'), [])
    const removeIndex = useCallback(index => {
        const item = Storage.getItem(Constants.Storage.CHARACTERS)
        if (item) {
            const name = item[index]
            Object.keys(Constants.Storage.Sheet).forEach(key => Storage.removeFilteredItem(Constants.Storage.Sheet[key], name))
        }
    }, [])

    useEffect(() => {
        const observable = Events.onCharacterStatChange(data => {
            logger.log('Updating stat', data)
            tempList.current = tempList.current.map((character, index) => index === data.index ? data.character : character)
        })
        return () => observable.unsubscribe()
    }, [logger])

    useEffect(() => {
        const observable = Events.onRemoveCharacter(data => {
            logger.log('Remove index', data)
            const list = characters.filter((character, index) => data !== index)
            removeIndex(data)
            setCharacters(list.length ? list : [{}])
        })
        return () => observable.unsubscribe()
    }, [characters, logger])

    function onSaveCharacters() {
        logger.log('Saving stats', characters)
        Storage.save('characterBoxes', characters)
        const names = characters.map(item => item.name)
        Storage.save(Constants.Storage.CHARACTERS, names)
        Events.publish(Events.CharacterListSaved, names)
    }

    function onNewStat() {
        setCharacters([...characters, {}])
    }

    return (
        <div className={'character-boxes'}>
            <div className={'container'}>
                {
                    characters.map((character, index) =>
                        <div key={index} className={'column'}>
                            <CharacterBox character={character} index={index} />
                        </div>)
                }
            </div>
            <div className={'action-buttons'}>
                <button onClick={onNewStat}>New</button>
                <button className={'save'} onClick={onSaveCharacters}>Save</button>
            </div>
        </div>
    )
}

export default CharacterBoxes