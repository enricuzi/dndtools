import React from "react"
import CharacterStats from "../CharacterStats/CharacterStats";
import MonsterStats from "../MonsterStats/MonsterStats";

const Battle = props => {
    return (
        <div className={'battle'}>
            <div className={'row'}>
                <CharacterStats />
            </div>
            <div className={'row'}>
                <MonsterStats />
            </div>
        </div>
    )
}

export default Battle