import React, {useEffect, useMemo, useState} from "react"
import './MonsterStats.css'
import Storage from "../Services/Storage";
import MonsterStat from "../MonsterStat/MonsterStat";
import Events from "../../models/Events";
import Logger from "../Services/Logger";

const MonsterStats = props => {

    const [monsters, setMonsters] = useState(Storage.getItem('monsters', sessionStorage) || [{}])
    const logger = useMemo(() => new Logger('MonsterStats'), [])

    useEffect(() => {
        const observable = Events.Tool.onMonsterRemove(index => {
            logger.log('removing monster', index)
            setMonsters(monsters.filter((item, i) => i !== index))
        })
        return () => observable.unsubscribe()
    }, [monsters, logger])

    function onRemoveMonster(index) {
        logger.log('Removing index', index)
        setMonsters(monsters.filter((item, i) => i !== index))
    }

    function addMonster() {
        setMonsters([...monsters, {}])
    }

    return (
        <div className={'monster-stats'}>
            <div className={'content'}>
                {
                    monsters.map((monster, index) =>
                        <MonsterStat onRemoveMonster={onRemoveMonster} key={index} monster={monster} index={index} />)
                }
            </div>
            <div className={'action-buttons'}>
                <button className={'add'} onClick={addMonster}>Add</button>
            </div>
        </div>
    )
}

export default MonsterStats