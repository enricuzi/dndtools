import React, {useEffect, useMemo, useState} from "react"
import './MonsterBoxes.css'
import Storage from "../Services/Storage";
import MonsterBox from "../MonsterBox/MonsterBox";
import Events from "../../models/Events";
import Logger from "../Services/Logger";

const MonsterBoxes = props => {

    const [monsters, setMonsters] = useState(Storage.getItem('monsters', sessionStorage) || [{}])
    const logger = useMemo(() => new Logger('MonsterBoxes'), [])

    useEffect(() => {
        const observable = Events.Tool.onMonsterRemove(index => {
            logger.log('removing monster', index)
            setMonsters(monsters.filter((item, i) => i !== index))
        })
        return () => observable.unsubscribe()
    }, [monsters, logger])

    function addMonster() {
        setMonsters([...monsters, {}])
    }

    return (
        <div className={'monster-boxes'}>
            <div className={'container'}>
                {
                    monsters.map((monster, index) =>
                        <div key={index} className={'column'}>
                            <MonsterBox monster={monster} index={index} />
                        </div>)
                }
            </div>
            <div className={'action-buttons'}>
                <button className={'add'} onClick={addMonster}>Add</button>
            </div>
        </div>
    )
}

export default MonsterBoxes