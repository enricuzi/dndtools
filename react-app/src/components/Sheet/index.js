import React from 'react';
import './index.css';
import Attributes from "./Attributes/Attributes";
import Weapons from "./Weapons/Weapons";
import Spells from "./Spells/Spells";
import Level from "./Level/Level";
import Armor from "./Armor/Armor";
import Health from "./Health/Health";
import Skills from "./Skills/Skills";

const Index = props => {

    const {character} = props

    return (
        <div className={'character-sheet'}>
            <fieldset className={'container'}>
                <legend>{character}</legend>
                <div className={'row'}>
                    <div className={'column'}>
                        <Attributes character={character} />
                    </div>
                    <div className={'column'}>
                        <div className={'row'}>
                            <Level/>
                            <Armor/>
                            <Health/>
                        </div>
                    </div>
                </div>
                <div className={'row'}>
                    <div className={'column'}>
                        <div className={'row'}>
                            <Weapons character={character} />
                        </div>
                    </div>
                    <div className={'column'}>
                        <div className={'row'}>
                            <Spells character={character} />
                        </div>
                    </div>
                    <div className={'column'}>
                        <div className={'row'}>
                            <Skills character={character} />
                        </div>
                    </div>
                </div>
            </fieldset>
        </div>
    )
}

export default Index
