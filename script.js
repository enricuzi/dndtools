// init canvas
const image = $("img")
	, canvas = $('canvas')
	, canvasMap = canvas[0]
	, canvasFog = canvas[1]
	, canvasContextMap = canvasMap.getContext('2d') // world
	, canvasContextFog = canvasFog.getContext('2d') // fog
	, r1 = 50
	, r2 = 150
	, density = .4
	, hideOnMove = true
	, hideFill = 'rgba( 0, 0, 0, .5 )'
	, overlay = 'rgba( 0, 0, 0, 1 )'
;

if (!hideOnMove) {
	// shouldn't be done like this, but this is a demo
	canvas.get(1).remove();
}

document.title = image[0].alt;

canvasMap.width = canvasFog.width = image.width();
canvasMap.height = canvasFog.height = image.height();

// black out the canvas
canvasContextMap.fillStyle = overlay;
canvasContextMap.fillRect(0, 0, canvasMap.width, canvasMap.height);

// set up our "eraser"
canvasContextMap.globalCompositeOperation = 'destination-out';

let isRemoveFog = false;

$(canvasFog)
	.on("mousedown", function (e) {
		e.preventDefault();
		isRemoveFog = true
	})
	.on("mouseup", function (e) {
		e.preventDefault();
		isRemoveFog = false
	})
	.on('mousemove', function (ev, ev2) {
		if (isRemoveFog) {
			ev2 && (ev = ev2);

			var pX = ev.pageX
				, pY = ev.pageY
			;

			// reveal wherever we drag
			var radGrd = canvasContextMap.createRadialGradient(pX, pY, r1, pX, pY, r2);
			radGrd.addColorStop(0, 'rgba( 0, 0, 0,  1 )');
			radGrd.addColorStop(density, 'rgba( 0, 0, 0, .1 )');
			radGrd.addColorStop(1, 'rgba( 0, 0, 0,  0 )');

			canvasContextMap.fillStyle = radGrd;
			canvasContextMap.fillRect(pX - r2, pY - r2, r2 * 2, r2 * 2);

			// partially hide the entire map and re-reval where we are now
			canvasContextFog.globalCompositeOperation = 'source-over';
			canvasContextFog.clearRect(0, 0, canvasContextFog.width, canvasContextFog.height);
			canvasContextFog.fillStyle = hideFill;
			canvasContextFog.fillRect(0, 0, canvasContextFog.width, canvasContextFog.height);

			radGrd = canvasContextMap.createRadialGradient(pX, pY, r1, pX, pY, r2);
			radGrd.addColorStop(0, 'rgba( 0, 0, 0,  1 )');
			radGrd.addColorStop(.8, 'rgba( 0, 0, 0, .1 )');
			radGrd.addColorStop(1, 'rgba( 0, 0, 0,  0 )');

			canvasContextFog.globalCompositeOperation = 'destination-out';
			canvasContextFog.fillStyle = radGrd;
			canvasContextFog.fillRect(pX - r2, pY - r2, r2 * 2, r2 * 2);
		}
	});

// cheat codes
var keyHistory = '';
$(document.body)
	.on('keypress', function (ev) {
		keyHistory += String.fromCharCode(ev.keyCode).toLowerCase();
		if (~keyHistory.indexOf('blacksheepwall')) {
			canvas.remove();
		}
	});
