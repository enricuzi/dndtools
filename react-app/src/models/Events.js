import {Subject} from "rxjs";

const PanelEvent = new Subject()

const Events = {
    PANEL_LEFT_CLOSED: 'panel-left-closed',
    PANEL_LEFT_OPENED: 'panel-left-opened',
    PANEL_LEFT_READY: 'panel-left-opened',
    PanelState: {
        subscribe: callback => {
            PanelEvent.asObservable().subscribe(status => callback(status))
        },
        publish: (event, data) => {
            PanelEvent.next({event, ...data})
        },
        panelLeftClosed: callback => {
            Events.PanelState.subscribe(data => data.event === Events.PANEL_LEFT_CLOSED && callback())
        },
        panelLeftOpened: callback => {
            Events.PanelState.subscribe(data => data.event === Events.PANEL_LEFT_OPENED && callback())
        },
        panelLeftReady: callback => {
            Events.PanelState.subscribe(data => data.event === Events.PANEL_LEFT_READY && callback(data.value))
        }
    }
}

export default Events