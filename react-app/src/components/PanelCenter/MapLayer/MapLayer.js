import React, {useEffect, useRef} from "react"
import Logger from "../../Services/Logger"
import BaseMap from "../BaseMap/BaseMap"
import "./MapLayer.css"
import Events from "../../../models/Events";

const MapLayer = props => {

    const logger = new Logger("MapLayer")
    const {alt, image} = props
    const r1 = 30
    const r2 = 100
    const density = .4
    const overlay = 'rgba( 0, 0, 0, 1 )'
    let baseMapImage = null
    let canvasFogRef = useRef(null)
    let isRemoveFog = false
    let restoreContext
    let contextFog = null
    let restoreCanvas = null

    useEffect(() => {
        const canvasFog = canvasFogRef.current
        contextFog = canvasFog.getContext("2d")

        canvasFog.addEventListener("touchstart", e => {
            // mousePos = getTouchPos(const canvasFog, e)
            const {clientX, clientY} = e.touches[0]
            const event = new MouseEvent("mousedown", {clientX, clientY})
            onMouseDown(event)
        }, false)

        canvasFog.addEventListener("touchend", e => {
            const event = new MouseEvent("mouseup", {})
            onMouseUp(event)
        }, false)

        canvasFog.addEventListener("touchmove", e => {
            const {clientX, clientY} = e.touches[0]
            const event = new MouseEvent("mousemove", {clientX, clientY})
            onMouseMove(event)
        }, false)
    })

    function initContextMap() {
        const canvasFog = canvasFogRef.current
        const {width, height} = canvasFog
        logger.log("Initializing Fog...", width, height)
        // black out the canvas
        contextFog.fillStyle = overlay
        contextFog.fillRect(0, 0, width, height)
        // set up our "eraser"
        contextFog.globalCompositeOperation = 'destination-out'

        restoreCanvas = document.createElement("canvas")
        restoreCanvas.width = width
        restoreCanvas.height = height
        restoreContext = restoreCanvas.getContext("2d")
        restoreContext.drawImage(canvasFog, 0, 0)
    }

    function restoreFog() {
        contextFog.globalCompositeOperation = "source-over"
        contextFog.drawImage(restoreCanvas, 0, 0)
        contextFog.globalCompositeOperation = "destination-out"
    }

    function sendImage() {
        const image = getDataImage()
        Events.publish(Events.SendImage, {image})
    }

    function showMap() {
        const canvasFog = canvasFogRef.current
        const {width, height} = canvasFog
        contextFog.fillStyle = overlay
        contextFog.fillRect(0, 0, width, height)
    }

    function onMouseDown(e) {
        e.preventDefault()
        isRemoveFog = true
    }

    function onMouseUp(e) {
        e.preventDefault()
        isRemoveFog = false
    }

    function onMouseMove(e) {
        e.preventDefault()
        if (isRemoveFog) {
            const pX = e.clientX + window.scrollX, pY = e.clientY - r2 + window.scrollY
            // reveal wherever we drag
            contextFog.fillStyle = getMapRadialGradient(pX, pY)
            contextFog.fillRect(pX - r2, pY - r2, r2 * 2, r2 * 2)
        }
    }

    function getMapRadialGradient(pX, pY) {
        const radGrd = contextFog.createRadialGradient(pX, pY, r1, pX, pY, r2)
        radGrd.addColorStop(0, 'rgba( 0, 0, 0,  1 )')
        radGrd.addColorStop(density, 'rgba( 0, 0, 0, .1 )')
        radGrd.addColorStop(1, 'rgba( 0, 0, 0,  0 )')
        return radGrd
    }

    function getDataImage(isShowAllMap) {
        const canvasFog = canvasFogRef.current
        const canvasPrint = document.createElement("canvas")
        canvasPrint.width = canvasFog.width
        canvasPrint.height = canvasFog.height
        const contextPrint = canvasPrint.getContext("2d")
        contextPrint.drawImage(baseMapImage, 0, 0, baseMapImage.width, baseMapImage.height, 0, 0, canvasFog.width, canvasFog.height)
        if (!isShowAllMap) {
            contextPrint.drawImage(canvasFog, 0, 0)
        }
        restoreContext.drawImage(canvasPrint, 0, 0)
        return canvasPrint.toDataURL('image/png')
    }

    function onImageLoad(image) {
        const canvasFog = canvasFogRef.current
        baseMapImage = image
        const {offsetWidth, offsetHeight} = image
        canvasFog.width = offsetWidth
        canvasFog.height = offsetHeight
        initContextMap()
    }

    return (
        <div className={"map-layer"}>
            <div className={"actions"}>
                <span>{alt}</span>
                <button onClick={restoreFog}>Cancel</button>
                <button onClick={sendImage}>Send</button>
                <button onClick={showMap}>Show Map</button>
            </div>
            <div className={"map-container"}>
                <BaseMap alt={alt} src={image} onImageLoad={onImageLoad}/>
                <canvas id={"canvas-fog"} ref={canvasFogRef} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseMove={onMouseMove}/>
            </div>
        </div>
    )
}

export default MapLayer