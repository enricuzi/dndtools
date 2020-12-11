import React, {useEffect, useMemo, useState} from 'react';
import Events from "../../../models/Events";
import Index from "../../Sheet";
import Logger from "../../Services/Logger";
import Storage from "../../Services/Storage";

const SheetContainer = props => {

    const logger = useMemo(() => new Logger('SheetContainer'), [])
    const [characters, setCharacters] = useState(Storage.getItem('characters') || [])

    useEffect(() => {
        [
            'attributes',
            'weapons',
            'spells',
        ].forEach(key => !Storage.contains(key) && Storage.save(key, {}))
    }, [])

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
                characters.map((item, index) => <Index key={index} character={item}/>)
            }
        </div>
    )
}

export default SheetContainer