import React, {useEffect, useRef} from "react"
import "./FreeDraw.css"
import Events from "../../models/Events"

const FreeDraw = props => {

    let isDrawEnabled = false
    let prevX = 0
    let currX = 0
    let prevY = 0
    let currY = 0
    let color = "black"
    let drawMode = "draw"
    let lineWidth = 10
    let deltaX = 0
    let deltaY = 0
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        canvas.width = window.innerWidth - 10
        canvas.height = window.innerHeight - 10

        const {offsetLeft, offsetTop} = canvas

        deltaX = offsetLeft
        deltaY = offsetTop

        canvas.addEventListener("touchstart", e => {
            // mousePos = getTouchPos(const canvasFog, e)
            const {clientX, clientY} = e.touches[0]
            const event = new MouseEvent("mousedown", {clientX, clientY})
            isDrawEnabled = true
            onMouseDown(event)
        }, false)

        canvas.addEventListener("touchend", e => {
            const event = new MouseEvent("mouseup", {})
            isDrawEnabled = false
            onMouseUp(event)
        }, false)

        canvas.addEventListener("touchmove", e => {
            const {clientX, clientY} = e.touches[0]
            const event = new MouseEvent("mousemove", {clientX, clientY})
            onMouseMove(event)
        }, false)
    }, [])

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
            if (drawMode === 'draw') {
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

    function setColor(e) {
        drawMode = "draw"
        const {className} = e.target
        switch (className) {
            case "green":
                color = "green"
                break
            case "blue":
                color = "blue"
                break
            case "red":
                color = "red"
                break
            case "yellow":
                color = "yellow"
                break
            case "orange":
                color = "orange"
                break
            case "white":
                color = "white"
                break
            default:
                color = "black"
        }
    }

    function resetCanvas() {
        const canvas = canvasRef.current
        const {width, height} = canvas
        const canvasContext = canvas.getContext("2d")
        canvasContext.fillStyle = "white"
        canvasContext.fillRect(0, 0, width, height)
        canvasContext.globalCompositeOperation = 'source-over'
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

    function sendImage() {
        const image = getDataImage()
        Events.Tool.publish(Events.Tool.SEND_IMAGE, {image})
    }

    return (
        <div className={"free-draw"}>
            <div className={"color-chooser"}>
                <button className={"green"} onClick={setColor}>Green</button>
                <button className={"blue"} onClick={setColor}>Blue</button>
                <button className={"red"} onClick={setColor}>Red</button>
                <button className={"yellow"} onClick={setColor}>Yellow</button>
                <button className={"orange"} onClick={setColor}>Orange</button>
                <button className={"black"} onClick={setColor}>Black</button>
                <button className={"white"} onClick={setColor}>White</button>
                <button className={"eraser"} onClick={() => drawMode = "eraser"}>Eraser</button>
                <select onChange={e => lineWidth = e.target.value}>
                    <option value={"2"}>2</option>
                    <option value={"10"} selected={true}>10</option>
                    <option value={"20"}>20</option>
                </select>
                <button className={"clear"} onClick={resetCanvas}>Reset</button>
                <button className={"save"} onClick={sendImage}>Send</button>
            </div>
            <canvas ref={canvasRef} onMouseMove={onMouseMove} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseOut={onMouseOut}/>
        </div>
    )
}

export default FreeDraw