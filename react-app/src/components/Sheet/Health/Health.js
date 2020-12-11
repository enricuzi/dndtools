import React, {useState} from 'react';
import './Health.css'
import Events from "../../../models/Events";

const Health = props => {

    const [value, setValue] = useState(props.value)

    function onChange(e) {
        const value = e.target.innerText
        Events.publish(Events.HealthChanged, value)
    }

    return (
        <fieldset className={'health'}>
            <legend>Health</legend>
            <span className={'text-center'} contentEditable={true} suppressContentEditableWarning={true} onInput={onChange}>{value}</span>
        </fieldset>
    )
}

export default Health