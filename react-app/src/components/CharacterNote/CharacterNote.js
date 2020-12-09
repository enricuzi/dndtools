import React, {useMemo, useRef, useState} from 'react';

const CharacterNote = props => {

    let {note} = props

    function clearText() {
        note = ''
    }

    return (
        <fieldset className={'character-note'}>
            <legend>Notes</legend>
            <textarea value={note} />
            <div className={'action-buttons'}>
                <button className={'clear'} onClick={clearText}>Clear</button>
            </div>
        </fieldset>
    )
}