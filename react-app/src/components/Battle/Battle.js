import React from "react"
import CharacterBoxes from "../CharacterBoxes/CharacterBoxes";
import MonsterBoxes from "../MonsterBoxes/MonsterBoxes";

const Battle = props => {
    return (
        <div className={'battle'}>
            <div className={'row'}>
                <CharacterBoxes />
            </div>
            <div className={'row'}>
                <MonsterBoxes />
            </div>
        </div>
    )
}

export default Battle