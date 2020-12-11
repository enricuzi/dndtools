import React, {useEffect, useMemo, useState} from "react"
import Events from "../../../models/Events";
import Logger from "../../Services/Logger";
import Spell from "../Spell/Spell";

const Spells = props => {

    const [spells, setSpells] = useState([])
    const logger = useMemo(() => new Logger('Spells'), [])

    useEffect(() => {
        const observer = Events.onRemoveSpell(value => {
            logger.log('removing spell', value)
            setSpells(spells.filter((item, index) => index !== value))
        })
        return () => observer.unsubscribe()
    }, [logger, spells])

    function addSpell() {
        setSpells([...spells, {}])
    }

    function save() {
        logger.log('saving spells', spells)
        Events.publish(Events.SaveSpell, spells)
    }

    return (
        <fieldset className={'spell-stats'}>
            <legend>Spells</legend>
            {
                spells.map((item, index) => <Spell key={index} index={index} />)
            }
            <div className={'action-buttons'}>
                <button onClick={addSpell}>Add</button>
                <button onClick={save} className={'save'}>Save</button>
            </div>
        </fieldset>
    )
}

export default Spells