import React, {useCallback, useEffect, useMemo, useState} from 'react';
import './Skills.css'
import Storage from "../../Services/Storage";
import Skill from "../Skill/Skill";
import Logger from "../../Services/Logger";
import Constants from "../../../models/Constants";
import Events from "../../../models/Events";

const Skills = props => {

    const logger = useMemo(() => new Logger('Skills'), [])
    const {character} = props
    const [list, setList] = useState(Storage.getFilteredItemOrDefault('features', character, []))

    const save = useCallback(data => {
        Storage.saveFilteredItem(Constants.Storage.FEATURES, character, data)
    }, [character])

    useEffect(() => {
        const saveObserver = Events.onSaveSkill(item => {
            const data = [...list]
            data.splice(item.index, 1, item)
            logger.log('saving skill', data)
            setList(data)
            save(data)
        })
        return () => saveObserver.unsubscribe()
    }, [logger, list, save])

    useEffect(() => {
        const observer = Events.onRemoveSkill(value => {
            logger.log('removing skill', value)
            const data = list.filter((item, index) => index !== value)
            setList(data)
            save(data)
        })
        return () => observer.unsubscribe()
    }, [logger, list, save])

    function newItem() {
        setList([...list, {}])
    }

    return (
        <fieldset className={'skill-stats'}>
            <legend>Skills</legend>
            {
                list && list.map((item, index) => <Skill key={index} data={item} />)
            }
            <div className={'action-buttons'}>
                <button onClick={newItem}>Add</button>
            </div>
        </fieldset>
    )
}

export default Skills