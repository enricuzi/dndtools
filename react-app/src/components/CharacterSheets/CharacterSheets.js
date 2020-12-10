import React, {useEffect, useMemo, useState} from 'react';
import Events from "../../models/Events";
import CharacterSheet from "../CharacterSheet/CharacterSheet";
import Logger from "../Services/Logger";
import Storage from "../Services/Storage";

const CharacterSheets = props => {

    const logger = useMemo(() => new Logger('CharacterSheets'), [])
    const [characters, setCharacters] = useState(Storage.getItem('characters') || [])

    useEffect(() => {
        const observer = Events.onCharacterListSaved(data => {
            logger.log('updating characters', data)
            setCharacters(data)
        })
        return () => observer.unsubscribe()
    }, [logger])

    return (
        <div className={'character-sheets'}>
            {
                characters.map((item, index) => <CharacterSheet key={index} character={item}/>)
            }
        </div>
    )
}

export default CharacterSheets