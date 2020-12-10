import React, {useEffect} from 'react';
import './CharacterSheet.css';
import CharacterAttributes from "../CharacterAttributes/CharacterAttributes";
import WeaponStats from "../WeaponStats/WeaponStats";
import SpellStats from "../SpellStats/SpellStats";
import Storage from "../Services/Storage";

const CharacterSheet = props => {

    const {character} = props

    useEffect(() => {
        [
            'attributes',
            'weapons',
            'spells',
        ].forEach(key => !Storage.contains(key) && Storage.save(key, {}))
    }, [])

    return (
        <div className={'character-sheet'}>
            <fieldset className={'container'}>
                <legend>{character}</legend>
                <div className={'row'}>
                    <div className={'column'}>
                        <CharacterAttributes character={character} />
                    </div>
                    <div className={'column'}>
                        <div className={'row'}>
                            <WeaponStats character={character} />
                        </div>
                    </div>
                    <div className={'column'}>
                        <div className={'row'}>
                            <SpellStats character={character} />
                        </div>
                    </div>
                </div>
            </fieldset>
        </div>
    )
}

export default CharacterSheet
