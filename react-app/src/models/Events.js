import {Subject} from "rxjs";

const Events = {
    Panel: {
        PANEL_LEFT_CLOSED: 'panel-left-closed',
        PANEL_LEFT_OPENED: 'panel-left-opened',
        PANEL_LEFT_READY: 'panel-left-opened',
        panelLeftClosed: callback => Events.Panel.subscribe(data => data.event === Events.Panel.PANEL_LEFT_CLOSED && callback()),
        panelLeftOpened: callback => Events.Panel.subscribe(data => data.event === Events.Panel.PANEL_LEFT_OPENED && callback()),
        panelLeftReady: callback => Events.Panel.subscribe(data => data.event === Events.Panel.PANEL_LEFT_READY && callback(data.value))
    },
    User: {
        LOG_IN: 'login',
        LOG_OUT: 'logout',
        login: callback => Events.User.subscribe(data => data.event === Events.User.LOG_IN && callback(data.user)),
        logout: callback => Events.User.subscribe(data => data.event === Events.User.LOG_OUT && callback())
    },
    Tool: {
        SELECTED_FREE_DRAW: 'selected-free-draw',
        SELECTED_UPLOAD_IMAGE: 'selected-upload-image',
        FREE_DRAW_COLOR: 'free-draw-color',
        FREE_DRAW_MODE: 'free-draw-mode',
        FREE_DRAW_LINE_WIDTH: 'free-draw-line-width',
        CHARACTER_STATS: 'character-stats',
        CHARACTER_STAT_CHANGE: 'character-stat-change',
        MONSTER_STAT_CHANGE: 'monster-stat-change',
        REMOVE_MONSTER: 'remove-monster',
        CLEAR_CANVAS: 'clear-canvas',
        SEND_IMAGE: 'send-image',
        SAVE_IMAGE: 'save-image',
        ROLL: 'roll',
        onMonsterRemove: callback => Events.Tool.subscribe(data => data.event === Events.Tool.REMOVE_MONSTER && callback(data.value)),
        onMonsterStatChange: callback => Events.Tool.subscribe(data => data.event === Events.Tool.MONSTER_STAT_CHANGE && callback(data.value)),
        onCharacterStatChange: callback => Events.Tool.subscribe(data => data.event === Events.Tool.CHARACTER_STAT_CHANGE && callback(data.value)),
        onCharacterStatsSelected: callback => Events.Tool.subscribe(data => data.event === Events.Tool.CHARACTER_STATS && callback()),
        freeDrawSelected: callback => Events.Tool.subscribe(data => data.event === Events.Tool.SELECTED_FREE_DRAW && callback()),
        uploadImageSelected: callback => Events.Tool.subscribe(data => data.event === Events.Tool.SELECTED_UPLOAD_IMAGE && callback(data.image)),
        onSendImage: callback => Events.Tool.subscribe(data => data.event === Events.Tool.SEND_IMAGE && callback(data.image)),
        onFreeDrawColor: callback => Events.Tool.subscribe(data => data.event === Events.Tool.FREE_DRAW_COLOR && callback(data.value)),
        onFreeDrawMode: callback => Events.Tool.subscribe(data => data.event === Events.Tool.FREE_DRAW_MODE && callback(data.value)),
        onFreeDrawLineWidth: callback => Events.Tool.subscribe(data => data.event === Events.Tool.FREE_DRAW_LINE_WIDTH && callback(data.value)),
        onClearCanvas: callback => Events.Tool.subscribe(data => data.event === Events.Tool.CLEAR_CANVAS && callback()),
        onRoll: callback => Events.Tool.subscribe(data => data.event === Events.Tool.ROLL && callback(data.value)),
        onSaveImage: callback => Events.Tool.subscribe(data => data.event === Events.Tool.SAVE_IMAGE && callback()),
    }
}

Object.keys(Events).forEach(key => {
    const Event = Events[key]
    Event.event = new Subject()
    Event.subscribe = callback => Event.event.asObservable().subscribe(status => callback(status))
    Event.publish = (event, data) => Event.event.next({event, ...data})
})

export default Events