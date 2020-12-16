import React, {useCallback, useEffect, useMemo, useState} from "react";
import './Weapons.css'
import Events from "../../../models/Events";
import Weapon from "../Weapon/Weapon";
import Logger from "../../Services/Logger";
import Storage from "../../Services/Storage";
import Constants from "../../../models/Constants";

const Weapons = props => {

    const logger = useMemo(() => new Logger('Weapons'), [])
    const {character} = props
    const [list, setList] = useState(Storage.getFilteredItemOrDefault(Constants.Storage.WEAPONS, character, []))

    const save = useCallback(data => {
        Storage.saveFilteredItem(Constants.Storage.WEAPONS, character, data)
    }, [character])

    useEffect(() => {
        const saveObserver = Events.onSaveWeapon(weapon => {
            const data = [...list]
            data.splice(weapon.index, 1, weapon)
            logger.log('saving weapons', data)
            setList(data)
            save(data);
        })
        return () => saveObserver.unsubscribe()
    }, [logger, list, save])

    useEffect(() => {
        const removeObserver = Events.onRemoveWeapon(value => {
            logger.log('removing weapon', value)
            const data = list.filter((item, index) => index !== value)
            setList(data)
            save(data);
        })
        return () => removeObserver.unsubscribe()
    }, [logger, list, save])

    function addWeapon() {
        setList([...list, {}])
    }

    return (
        <fieldset className={'weapon-stats'}>
            <legend>Weapons</legend>
            {
                list && list.map((item, index) => <Weapon key={index} index={index} data={item} />)
            }
            <div className={'action-buttons'}>
                <button onClick={addWeapon}>Add</button>
            </div>
        </fieldset>
    )
}

export default Weapons