import React, {useEffect, useMemo, useRef, useState} from 'react';
import './Skill.css'
import Logger from "../../Services/Logger";
import Utils from "../../Utils/Utils";
import Events from "../../../models/Events";

const Skill = props => {

    const logger = useMemo(() => new Logger('Skill'), [])
    const {index} = props
    const [data, setData] = useState(props.data)
    const [collapse, setCollapse] = useState('collapsed')
    const targetRef = useRef(null)
    let timer = useRef(0)

    useEffect(() => {
        clearTimeout(timer.current)
        timer.current = Utils.delay(500, () => {
            logger.log('saving skill', data)
            Events.publish(Events.SaveSkill, {...data, index})
        })
    }, [logger, index, data, timer])

    useEffect(() => {
        const target = targetRef.current
        if (target && target.innerText.length) {
            Utils.setCursor(target)
        }
    }, [targetRef, data])

    function remove() {
        logger.log('removing skill', index)
        Events.publish(Events.RemoveSkill, index)
    }

    function onChangeName(e) {
        const value = e.target.innerText
        clearTimeout(timer)
        timer = Utils.delay(500, () => setData({
            name: value,
            description: data.description
        }))
    }

    function onChangeDescription(e) {
        const value = e.target.value
        setData({
            name: data.name,
            description: value
        })
    }

    function onFocus(e) {
        targetRef.current = e.target
        Utils.setCursor(e.target)
    }

    function toggleContent() {
        setCollapse(collapse ? '' : 'collapsed')
    }

    return (
        <fieldset className={'skill-stat'}>
            <legend contentEditable={true} suppressContentEditableWarning={true} onInput={onChangeName} onFocus={onFocus}>{data.name}</legend>
            <div className={`column ${collapse}`}>
                <textarea value={data.description} onChange={onChangeDescription} rows={5} />
                <div className={'action-buttons'}>
                    <button className={'clear'} onClick={remove}>Remove</button>
                </div>
            </div>
            <span className={'toggle'} onClick={toggleContent}>{collapse ? '>' : '<'}</span>
        </fieldset>
    )
}

export default Skill