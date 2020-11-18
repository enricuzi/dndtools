import {Subject} from "rxjs";

const Events = {
    Panel: {
        event: new Subject(),
        PANEL_LEFT_CLOSED: 'panel-left-closed',
        PANEL_LEFT_OPENED: 'panel-left-opened',
        PANEL_LEFT_READY: 'panel-left-opened',
        subscribe: callback => {
            Events.Panel.event.asObservable().subscribe(status => callback(status))
        },
        publish: (event, data) => {
            Events.Panel.event.next({event, ...data})
        },
        panelLeftClosed: callback => {
            Events.Panel.subscribe(data => data.event === Events.Panel.PANEL_LEFT_CLOSED && callback())
        },
        panelLeftOpened: callback => {
            Events.Panel.subscribe(data => data.event === Events.Panel.PANEL_LEFT_OPENED && callback())
        },
        panelLeftReady: callback => {
            Events.Panel.subscribe(data => data.event === Events.Panel.PANEL_LEFT_READY && callback(data.value))
        }
    },
    User: {
        event: new Subject(),
        LOG_IN: 'login',
        LOG_OUT: 'logout',
        subscribe: callback => {
            Events.User.event.asObservable().subscribe(status => callback(status))
        },
        publish: (event, data) => {
            Events.User.event.next({event, ...data})
        },
        login: callback => {
            Events.User.subscribe(data => data.event === Events.User.LOG_IN && callback(data.user))
        },
        logout: callback => {
            Events.User.subscribe(data => data.event === Events.User.LOG_OUT && callback())
        }
    },
    Tool: {
        SELECTED_FREE_DRAW: 'selected-free-draw',
        SELECTED_UPLOAD_IMAGE: 'selected-upload-image',
        event: new Subject(),
        subscribe: callback => {
            Events.Tool.event.asObservable().subscribe(status => callback(status))
        },
        publish: (event, data) => {
            Events.Tool.event.next({event, ...data})
        },
        freeDrawSelected: callback => {
            Events.Tool.subscribe(data => data.event === Events.Tool.SELECTED_FREE_DRAW && callback())
        },
        uploadImageSelected: callback => {
            Events.Tool.subscribe(data => data.event === Events.Tool.SELECTED_UPLOAD_IMAGE && callback(data.image))
        }
    }
}

export default Events