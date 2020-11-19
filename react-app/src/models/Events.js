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
        SEND_IMAGE: 'send-image',
        freeDrawSelected: callback => Events.Tool.subscribe(data => data.event === Events.Tool.SELECTED_FREE_DRAW && callback()),
        uploadImageSelected: callback => Events.Tool.subscribe(data => data.event === Events.Tool.SELECTED_UPLOAD_IMAGE && callback(data.image)),
        onSendImage: callback => Events.Tool.subscribe(data => data.event === Events.Tool.SEND_IMAGE && callback(data.image))
    }
}

Object.keys(Events).forEach(key => {
    Events[key].event = new Subject()
    Events[key].subscribe = callback => Events[key].event.asObservable().subscribe(status => callback(status))
    Events[key].publish = (event, data) => Events[key].event.next({event, ...data})
})

export default Events