import {Subject} from "rxjs";

const Events = {
    AttributeBonusChange: 'AttributeBonusChange',
    AttributeStrengthBonusChanged: 'AttributeStrengthBonusChanged',
    AttributeDexterityBonusChanged: 'AttributeDexterityBonusChanged',
    AttributeConstitutionBonusChanged: 'AttributeConstitutionBonusChanged',
    AttributeIntelligenceBonusChanged: 'AttributeIntelligenceBonusChanged',
    AttributeWisdomBonusChanged: 'AttributeWisdomBonusChanged',
    AttributeCharismaBonusChanged: 'AttributeCharismaBonusChanged',
    ArmorChanged: 'ArmorChanged',
    ClearCanvas: 'ClearCanvas',
    CharacterStats: 'CharacterStats',
    CharacterStatChange: 'CharacterStatChange',
    CharacterRemove: 'CharacterRemove',
    CharacterListSaved: 'CharacterListSaved',
    FreeDrawColor: 'FreeDrawColor',
    FreeDrawMode: 'FreeDrawMode',
    FreeDrawLineWidth: 'FreeDrawLineWidth',
    FreeDrawSelected: 'FreeDrawSelected',
    HealthChanged: 'HealthChanged',
    LevelChanged: 'LevelChanged',
    LogIn: 'LogIn',
    LogOut: 'LogOut',
    MonsterStatChange: 'MonsterStatChange',
    MonsterRemove: 'MonsterRemove',
    PanelLeftClosed: 'PanelLeftClosed',
    PanelLeftOpened: 'PanelLeftOpened',
    PanelLeftReady: 'PanelLeftReady',
    SelectedFreeDraw: 'SelectedFreeDraw',
    SelectedUploadImage: 'SelectedUploadImage',
    RemoveCharacter: 'RemoveCharacter',
    RemoveMonster: 'RemoveMonster',
    Roll: 'Roll',
    RemoveWeapon: 'RemoveWeapon',
    RemoveSpell: 'RemoveSpell',
    SendImage: 'SendImage',
    SaveImage: 'SaveImage',
    SaveWeapon: 'SaveWeapon',
    SaveSpell: 'SaveSpell',
    UploadImageSelected: 'UploadImageSelected',
}

Events.subscribe = (event, callback) => Events.subjects[event].asObservable().subscribe(callback)
Events.publish = (event, data) => Events.subjects[event].next(data)
Events.subjects = {}

const events = Object.keys(Events)
events.forEach(event => {
    Events.subjects[event] = new Subject()
    Events['on' + event] = callback => Events.subscribe(event, callback)
})

export default Events