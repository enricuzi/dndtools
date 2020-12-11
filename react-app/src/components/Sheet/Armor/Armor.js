import React from 'react';
import Events from "../../../models/Events";

const Armor = props => {

    const {value} = props

    function onChange(e) {
        const value = e.target.innerText
        Events.publish(Events.ArmorChanged, value)
    }

    return (
        <fieldset className={'armor'}>
            <legend>Armor</legend>
            <span className={'text-center'} contentEditable={true} suppressContentEditableWarning={true} onInput={onChange}>{value}</span>
        </fieldset>
    )
}

export default Armor