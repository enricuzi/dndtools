import React from 'react';
import Events from "../../../models/Events";

const Level = props => {

    const {value} = props

    function onChange(e) {
        const {value} = e.target
        Events.publish(Events.LevelChanged, value)
    }

    return (
        <fieldset className={'level'}>
            <legend>Level</legend>
            <input type={"number"} min={1} value={value} onChange={onChange} />
        </fieldset>
    )
}

export default Level