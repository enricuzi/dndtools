import React, {useCallback, useEffect, useMemo, useState} from "react"
import './Spells.css'
import Events from "../../../models/Events";
import Logger from "../../Services/Logger";
import Spell from "../Spell/Spell";
import Storage from "../../Services/Storage";
import Constants from "../../../models/Constants";

const Spells = props => {

    const logger = useMemo(() => new Logger('Spells'), [])
    const {character} = props
    const [list, setList] = useState(Storage.getFilteredItemOrDefault(Constants.Storage.SPELLS, character, []))

    const save = useCallback(data => {
        Storage.saveFilteredItem(Constants.Storage.SPELLS, character, data)
    }, [character])

    useEffect(() => {
        const saveObserver = Events.onSaveSpell(item => {
            const data = [...list]
            data.splice(item.index, 1, item)
            logger.log('received saving spell', data)
            setList(data)
            save(data)
        })
        return () => saveObserver.unsubscribe()
    }, [logger, list, save])

    useEffect(() => {
        const observer = Events.onRemoveSpell(value => {
            logger.log('removing spell', value)
            const data = list.filter((item, index) => index !== value)
            setList(data)
            save(data)
        })
        return () => observer.unsubscribe()
    }, [logger, list, save])

    function addSpell() {
        setList([...list, {}])
    }

    return (
        <fieldset className={'spell-stats'}>
            <legend>Spells</legend>
            {
                list && list.map((item, index) => <Spell key={index} data={item} index={index} />)
            }
            <div className={'action-buttons'}>
                <button onClick={addSpell}>Add</button>
            </div>
        </fieldset>
    )
}

export default Spells