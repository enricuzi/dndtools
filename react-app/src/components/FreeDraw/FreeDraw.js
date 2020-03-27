import React, {Component} from "react";
import "./FreeDraw.css";

export default class FreeDraw extends Component {

	constructor(props) {
		super(props);
		this.isDrawEnabled = false;
		this.prevX = 0;
		this.currX = 0;
		this.prevY = 0;
		this.currY = 0;
		this.color = "black";
		this.lineWidth = 10;
		this.drawMode = "draw";
		this.setColor = this.setColor.bind(this);
		this.resetCanvas = this.resetCanvas.bind(this);
		this.sendImage = this.sendImage.bind(this);
	}

	componentDidMount() {

		this.canvas.width = window.innerWidth - 20;
		this.canvas.height = window.innerHeight - 100;

		const {offsetLeft, offsetTop} = this.canvas;
		const colorChooserOffsetHeight = this.colorChooser.offsetHeight;

		this.canvasContext = this.canvas.getContext("2d");

		this.canvas.addEventListener("mousemove", e => {
			this.currX = parseInt(e.clientX - offsetLeft);
			this.currY = parseInt(e.clientY - offsetTop - colorChooserOffsetHeight);
			if (this.isDrawEnabled) {
				this.canvasContext.beginPath();
				if (this.drawMode === 'draw') {
					this.canvasContext.globalCompositeOperation = 'source-over';
					this.canvasContext.strokeStyle = this.color;
					this.canvasContext.lineWidth = this.lineWidth;
				} else {
					this.canvasContext.globalCompositeOperation = 'destination-out';
					this.canvasContext.lineWidth = Number(this.lineWidth) * 3;
				}
				this.canvasContext.moveTo(this.prevX, this.prevY);
				this.canvasContext.lineTo(this.currX, this.currY);
				this.canvasContext.lineJoin = this.canvasContext.lineCap = 'round';
				this.canvasContext.stroke();
				this.prevX = this.currX;
				this.prevY = this.currY;
			}
		}, false);
		this.canvas.addEventListener("mousedown", e => {
			const {offsetLeft, offsetTop} = this.canvas;
			this.prevX = this.currX = parseInt(e.clientX - offsetLeft);
			this.prevY = this.currY = parseInt(e.clientY - offsetTop - colorChooserOffsetHeight);
			this.isDrawEnabled = true;
		}, false);
		this.canvas.addEventListener("mouseup", e => {
			this.isDrawEnabled = false;
		}, false);
		this.canvas.addEventListener("mouseout", e => {
			this.isDrawEnabled = false;
		}, false);
	}

	setColor(e) {
		this.drawMode = "draw";
		const {className} = e.target;
		switch (className) {
			case "green":
				this.color = "green";
				break;
			case "blue":
				this.color = "blue";
				break;
			case "red":
				this.color = "red";
				break;
			case "yellow":
				this.color = "yellow";
				break;
			case "orange":
				this.color = "orange";
				break;
			case "white":
				this.color = "white";
				break;
			default:
				this.color = "black";
		}
	}

	resetCanvas() {
		const {width, height} = this.canvas;
		this.canvasContext.fillStyle = "white";
		this.canvasContext.fillRect(0, 0, width, height);
		this.canvasContext.globalCompositeOperation = 'source-over';
	}

	getDataImage() {
		const canvasPrint = document.createElement("canvas");
		canvasPrint.width = this.canvas.width;
		canvasPrint.height = this.canvas.height;
		const contextPrint = canvasPrint.getContext("2d");
		contextPrint.drawImage(this.canvas, 0, 0);
		return canvasPrint.toDataURL('image/png');
	}

	sendImage() {
		const image = this.getDataImage();
		this.props.onSendImage && this.props.onSendImage(image);
	}

	render() {
		return (
			<div className={"free-draw"}>
				<div className={"color-chooser"} ref={ref => this.colorChooser = ref}>
					<button className={"green"} onClick={this.setColor}>Green</button>
					<button className={"blue"} onClick={this.setColor}>Blue</button>
					<button className={"red"} onClick={this.setColor}>Red</button>
					<button className={"yellow"} onClick={this.setColor}>Yellow</button>
					<button className={"orange"} onClick={this.setColor}>Orange</button>
					<button className={"black"} onClick={this.setColor}>Black</button>
					<button className={"white"} onClick={this.setColor}>White</button>
					<button className={"eraser"} onClick={() => this.drawMode = "eraser"}>Eraser</button>
					<select onChange={e => this.lineWidth = e.target.value}>
						<option value={"2"}>2</option>
						<option value={"10"} selected={true}>10</option>
						<option value={"20"}>20</option>
					</select>
					<button className={"clear"} onClick={this.resetCanvas}>Reset</button>
					<button className={"send"} onClick={this.sendImage}>Send</button>
				</div>
				<canvas ref={ref => this.canvas = ref}/>
			</div>
		)
	}
}