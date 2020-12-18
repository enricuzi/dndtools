import React, {useEffect, useMemo, useRef, useState} from "react";
import "./Attribute.css";
import Utils from "../../Utils/Utils";
import Logger from "../../Services/Logger";
import Events from "../../../models/Events";

const Attribute = props => {

    const logger = useMemo(() => new Logger('Attribute'), [])
    const {index} = props
    const [data, setData] = useState(props.data)
    const targetRef = useRef(null)
    const timer = useRef(0)

    useEffect(() => {
        clearTimeout(timer.current)
        timer.current = Utils.delay(500, () => {
            logger.log('changing attribute', data)
            Events.publish(Events.AttributeBonusChange, {...data, index})
        })
    }, [logger, index, data])

    useEffect(() => {
        const target = targetRef.current
        if (target && target.innerText.length) {
            Utils.setCursor(target)
        }
    }, [targetRef, data])

    function onChangeValue(e) {
        const {value} = e.target;
        setData({...data, value})
    }

    function onChangeExtra(e) {
        const extra = e.target.innerText
        !!extra && setData({...data, extra})
    }

    function onFocus(e) {
        targetRef.current = e.target
        Utils.setCursor(e.target)
    }

    return (
        <div className={`character-attribute ${data.id}`}>
            <label>{data.label}</label>
            <input type={"number"} min={1} placeholder={data.label} value={data.value} onChange={onChangeValue} />
            <span>{Utils.getAttributeBonus(data.value)}</span>
            <span contentEditable={true} suppressContentEditableWarning={true} onInput={onChangeExtra} onFocus={onFocus}>{data.extra}</span>
        </div>
    )
}

export default Attribute
