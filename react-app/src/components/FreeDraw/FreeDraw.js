import React, {useEffect, useRef, useState} from "react"
import "./FreeDraw.css"
import Events from "../../models/Events"
import Constants from "../../models/Constants";
import Logger from "../Services/Logger";

const FreeDraw = props => {

    const logger = new Logger('FreeDraw')
    let isDrawEnabled = false
    let prevX = 0
    let currX = 0
    let prevY = 0
    let currY = 0
    let deltaX = 0
    let deltaY = 0
    const canvasRef = useRef(null)
    const [color, setColor] = useState(Constants.Color.black)
    const [mode, setMode] = useState(Constants.Tool.FREE_DRAW_MODE_DRAW)
    const [lineWidth, setLineWidth] = useState(10)

    Events.onFreeDrawColor(value => {
        logger.log('Setting color to', value)
        setColor(value)
    })
    Events.onFreeDrawLineWidth(value => setLineWidth(value))
    Events.onFreeDrawMode(value => setMode(value))
    Events.onClearCanvas(() => {
        const canvas = canvasRef.current
        const {width, height} = canvas
        const canvasContext = canvas.getContext("2d")
        canvasContext.fillStyle = "white"
        canvasContext.fillRect(0, 0, width, height)
        canvasContext.globalCompositeOperation = 'source-over'
    })
    Events.onSaveImage(() => {
        const image = getDataImage()
        Events.publish(Events.SendImage, {image})
    })

    useEffect(() => {
        const canvas = canvasRef.current
        canvas.width = window.innerWidth - 10
        canvas.height = window.innerHeight - 70

        const {offsetLeft, offsetTop} = canvas

        deltaX = offsetLeft
        deltaY = offsetTop
    }, [])

    function onTouchStart(e) {
        e.preventDefault()
        isDrawEnabled = e.touches.length === 1
        logger.log('Touch start', isDrawEnabled)
        const {clientX, clientY} = e.touches[0]
        const event = new MouseEvent("mousedown", {clientX, clientY})
        onMouseDown(event)
    }

    function onTouchEnd(e) {
        isDrawEnabled = false
    }

    function onTouchMove(e) {
        e.preventDefault()
        isDrawEnabled = e.touches.length === 1
        logger.log('Touch end', isDrawEnabled)
        const {clientX, clientY} = e.touches[0]
        const event = new MouseEvent("mousemove", {clientX, clientY})
        onMouseMove(event)
    }

    function onMouseOut(e) {
        isDrawEnabled = false
    }

    function onMouseUp(e) {
        isDrawEnabled = false
    }

    function onMouseDown(e) {
        const {scrollX, scrollY} = window
        prevX = currX = parseInt(e.clientX - deltaX + scrollX)
        prevY = currY = parseInt(e.clientY - deltaY + scrollY)
        isDrawEnabled = true
    }

    function onMouseMove(e) {
        const {scrollX, scrollY} = window
        const currX = parseInt(e.clientX - deltaX + scrollX)
        const currY = parseInt(e.clientY - deltaY + scrollY)
        if (isDrawEnabled) {
            const canvasContext = canvasRef.current.getContext("2d")
            canvasContext.beginPath()
            if (mode === Constants.Tool.FREE_DRAW_MODE_DRAW) {
                logger.log('Drawing', color, lineWidth)
                canvasContext.globalCompositeOperation = 'source-over'
                canvasContext.strokeStyle = color
                canvasContext.lineWidth = lineWidth
            } else {
                canvasContext.globalCompositeOperation = 'destination-out'
                canvasContext.lineWidth = Number(lineWidth) * 3
            }
            canvasContext.moveTo(prevX, prevY)
            canvasContext.lineTo(currX, currY)
            canvasContext.lineJoin = canvasContext.lineCap = 'round'
            canvasContext.stroke()
            prevX = currX
            prevY = currY
        }
    }

    function getDataImage() {
        const canvasPrint = document.createElement("canvas")
        const canvas = canvasRef.current
        canvasPrint.width = canvas.width
        canvasPrint.height = canvas.height
        const contextPrint = canvasPrint.getContext("2d")
        contextPrint.drawImage(canvas, 0, 0)
        return canvasPrint.toDataURL('image/png')
    }

    function clearCanvas() {
        Events.publish(Events.ClearCanvas)
    }

    function saveImage() {
        Events.publish(Events.SaveImage)
    }

    return (
        <div className={"free-draw"}>
            <canvas ref={canvasRef} onMouseMove={onMouseMove} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseOut={onMouseOut} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} onTouchMove={onTouchMove}/>
            <div className={'action-buttons'}>
                <button className={'clear'} onClick={clearCanvas}>Reset</button>
                <button className={'save'} onClick={saveImage}>Send</button>
            </div>
        </div>
    )
}

export default FreeDraw