import React, {useRef, useState} from 'react';
import './CharacterSheetContainer.css';
import CharacterAttributes from "../CharacterAttributes/CharacterAttributes";
import WeaponStats from "../WeaponStats/WeaponStats";
import SpellStats from "../SpellStats/SpellStats";

const CharacterSheetContainer = props => {

    const [character, setCharacter] = useState({
        note: ''
    })

    const noteRef = useRef(null)

    function setNote() {
        const {value} = noteRef.current;
        character.note = value;
        setCharacter(character)
    }

    function clearText() {
        noteRef.current.value = ''
    }

    return (
        <div className={'character-sheet'}>
            <div className={'row'}>
                <div className={'column'}>
                    <CharacterAttributes />
                </div>
                <div className={'column'}>
                    <div className={'row'}>
                        <WeaponStats />
                    </div>
                </div>
                <div className={'column'}>
                    <div className={'row'}>
                        <SpellStats />
                    </div>
                </div>
            </div>
            <div className={'row'}>
                <fieldset>
                    <legend>Notes</legend>
                    <textarea value={character.note} onChange={setNote} ref={noteRef} />
                </fieldset>
            </div>
            <div className={'action-buttons'}>
                <button className={'clear'} onClick={clearText}>Clear</button>
            </div>
        </div>
    )
}

export default CharacterSheetContainer
