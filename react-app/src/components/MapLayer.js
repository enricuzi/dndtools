import React, {Component} from "react";
import Logger from "../Logger";
import BaseMap from "./BaseMap";

export default class MapLayer extends Component {

	constructor(props) {
		super(props);
		this.logger = new Logger("MapLayer");
		this.r1 = 50;
		this.r2 = 150;
		this.density = .4;
		this.overlay = 'rgba( 0, 0, 0, 1 )';
		this.baseMapImage = null;

		this.onMouseMove = this.onMouseMove.bind(this);
		this.onMouseDown = this.onMouseDown.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);
		this.getDataImage = this.getDataImage.bind(this);
		this.onImageLoad = this.onImageLoad.bind(this);
	}

	componentDidMount() {
		this.contextFog = this.canvasFog.getContext("2d");
		let mousePos;
		this.canvasFog.addEventListener("touchstart", e => {
			mousePos = getTouchPos(this.canvasFog, e);
			const touch = e.touches[0];
			const event = new MouseEvent("mousedown", {
				clientX: touch.clientX,
				clientY: touch.clientY
			});
			this.onMouseDown(event)
		}, false);
		this.canvasFog.addEventListener("touchend", e => {
			const event = new MouseEvent("mouseup", {});
			this.onMouseUp(event);
		}, false);
		this.canvasFog.addEventListener("touchmove",  e => {
			const touch = e.touches[0];
			const event = new MouseEvent("mousemove", {
				clientX: touch.clientX,
				clientY: touch.clientY
			});
			this.onMouseMove(event)
		}, false);

		function getTouchPos(canvasDom, touchEvent) {
			const rect = canvasDom.getBoundingClientRect();
			return {
				x: touchEvent.touches[0].clientX - rect.left,
				y: touchEvent.touches[0].clientY - rect.top
			};
		}
	}

	initContextMap() {
		const {width, height} = this.canvasFog;
		this.logger.log("Initializing Fog...", width, height);
		// black out the canvas
		this.contextFog.fillStyle = this.overlay;
		this.contextFog.fillRect(0, 0, width, height);
		// set up our "eraser"
		this.contextFog.globalCompositeOperation = 'destination-out';
	}

	onMouseDown(e) {
		e.preventDefault();
		this.isRemoveFog = true
	}

	onMouseUp(e) {
		e.preventDefault();
		this.isRemoveFog = false;
		const image = this.getDataImage();
		this.logger.log(image);
		this.props.socket.emit("upload", image);
	}

	getDataImage() {
		const canvasPrint = document.createElement("canvas");
		canvasPrint.width = this.canvasFog.width;
		canvasPrint.height = this.canvasFog.height;
		const contextPrint = canvasPrint.getContext("2d");
		contextPrint.drawImage(this.baseMapImage, 0, 0);
		contextPrint.drawImage(this.canvasFog, 0, 0);
		return canvasPrint.toDataURL('image/png');
	}

	onMouseMove(e) {
		e.preventDefault();
		if (this.isRemoveFog) {
			// ev2 && (ev = ev2);

			const pX = e.pageX
				, pY = e.pageY;

			// reveal wherever we drag
			this.contextFog.fillStyle = this.getMapRadialGradient(pX, pY);
			this.contextFog.fillRect(pX - this.r2, pY - this.r2, this.r2 * 2, this.r2 * 2);
		}
	}

	getMapRadialGradient(pX, pY) {
		let radGrd = this.contextFog.createRadialGradient(pX, pY, this.r1, pX, pY, this.r2);
		radGrd.addColorStop(0, 'rgba( 0, 0, 0,  1 )');
		radGrd.addColorStop(this.density, 'rgba( 0, 0, 0, .1 )');
		radGrd.addColorStop(1, 'rgba( 0, 0, 0,  0 )');
		return radGrd;
	}

	onImageLoad(image) {
		this.baseMapImage = image;
		const {width, height} = image;
		this.canvasFog.width = width;
		this.canvasFog.height = height;
		this.initContextMap();
	}

	render() {
		const {image} = this.props;
		return (
			<div className={"map"}>
				<BaseMap alt={"Baldur's Gate"} src={image} onImageLoad={this.onImageLoad}/>
				<canvas id={"canvas-fog"} ref={ref => this.canvasFog = ref} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp} onMouseMove={this.onMouseMove}/>
			</div>
		)
	}
}
