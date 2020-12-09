import React, {useEffect, useMemo, useState} from "react";
import Events from "../../models/Events";
import WeaponStat from "../WeaponStat/WeaponStat";
import Logger from "../Services/Logger";

const WeaponStats = props => {

    const [weapons, setWeapons] = useState([])
    const logger = useMemo(() => new Logger('WeaponStats'), [])

    useEffect(() => {
        const observer = Events.onRemoveWeapon(value => {
            logger.log('removing spell', value)
            setWeapons(weapons.filter((item, index) => index !== value))
        })
        return () => observer.unsubscribe()
    }, [logger, weapons])

    function save() {
        logger.log('saving weapons', weapons)
        Events.publish(Events.SaveWeapon, weapons)
    }

    function addWeapon() {
        setWeapons([...weapons, {}])
    }

    return (
        <fieldset className={'weapon-container'}>
            <legend>Weapons</legend>
            {
                weapons.map((item, index) =>
                    <WeaponStat key={index} index={index} />)
            }
            <div className={'action-buttons'}>
                <button onClick={addWeapon}>Add</button>
                <button onClick={save} className={'save'}>Save</button>
            </div>
        </fieldset>
    )
}

export default WeaponStats