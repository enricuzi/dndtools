import React from 'react';
import Events from "../../../models/Events";

const Level = props => {

    const {value} = props

    function onChange(e) {
        const value = e.target.innerText
        Events.publish(Events.LevelChanged, value)
    }

    return (
        <fieldset className={'level'}>
            <legend>Level</legend>
            <span className={'text-center'} contentEditable={true} suppressContentEditableWarning={true} onInput={onChange}>{value}</span>
        </fieldset>
    )
}

export default Level