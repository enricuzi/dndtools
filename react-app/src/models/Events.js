import {Subject} from "rxjs";

const PanelEvent = new Subject()

const Events = {
    PANEL_LEFT_CLOSED: 'panel-left-closed',
    PANEL_LEFT_OPENED: 'panel-left-opened',
    PanelState: {
        subscribe: callback => {
            PanelEvent.asObservable().subscribe(status => callback(status))
        },
        publish: status => {
            PanelEvent.next(status)
        },
        panelLeftClosed: callback => {
            Events.PanelState.subscribe(status => status === Events.PANEL_LEFT_CLOSED && callback())
        },
        panelLeftOpened: callback => {
            Events.PanelState.subscribe(status => status === Events.PANEL_LEFT_OPENED && callback())
        }
    }
}

export default Events