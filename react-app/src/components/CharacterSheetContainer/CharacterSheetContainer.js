import React, {useState} from 'react';
import './CharacterSheetContainer.css';
import CharacterAttributes from "../CharacterAttributes/CharacterAttributes";
import WeaponStats from "../WeaponStats/WeaponStats";
import SpellStats from "../SpellStats/SpellStats";
import Storage from "../Services/Storage";

const CharacterSheetContainer = props => {

    const [character, setCharacter] = useState(Storage.getItem('character') || {})

    return (
        <div className={'character-sheet'}>
            <fieldset className={'container'}>
                <legend contentEditable={true} suppressContentEditableWarning={true}/>
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
            </fieldset>
        </div>
    )
}

export default CharacterSheetContainer
