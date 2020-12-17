import React, {useEffect, useMemo, useState} from 'react';
import Events from "../../../models/Events";
import Index from "../../Sheet";
import Logger from "../../Services/Logger";
import Storage from "../../Services/Storage";
import Constants from "../../../models/Constants";

const SheetContainer = props => {

    const logger = useMemo(() => new Logger('SheetContainer'), [])
    const [characters, setCharacters] = useState(Storage.getItemOrDefault(Constants.Storage.CHARACTERS, []))

    useEffect(() => {
        Object.keys(Constants.Storage.Sheet).forEach(key => {
            if (!Storage.contains(key)) {
                characters.forEach(name => Storage.saveFilteredItem(Constants.Storage.Sheet[key], name, []))
            }
        })
    }, [characters])

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