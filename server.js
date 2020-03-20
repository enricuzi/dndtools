const express = require('express');
const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');
const sio = require('socket.io');
const favicon = require('serve-favicon');
const compression = require('compression');

const app = express(),
	options = {
		key: fs.readFileSync(__dirname + '/rtc-video-room-key.pem'),
		cert: fs.readFileSync(__dirname + '/rtc-video-room-cert.pem')
	},
	port = process.env.PORT || 3000,
	server = process.env.NODE_ENV === 'production' ?
		http.createServer(app).listen(port, () => console.log("Server started on port", port)) :
		https.createServer(options, app).listen(port, () => console.log("Server started on port", port)),
	io = sio(server);

// compress all requests
app.use(compression());

app.use(express.static(path.join(__dirname, 'react-app/build')));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Access the parse results as request.body
app.post('/login', (req, res) => {
	let {username, password} = req.body;
	username = username.trim();
	password = password.trim();
	console.log("Authenticating...", username, password);
	if (username.toLowerCase() === "master" && password.toLowerCase() === "enrico") {
		console.log("User logged id as master");
		res.status(200).send("master");
	} else if (username.toLowerCase() === "player" && password.toLowerCase() === "tormund") {
		console.log("User logged id as player");
		res.status(200).send("player");
	} else {
		console.log("Cannot log user");
		res.send(401);
	}
});

app.use((req, res) => res.sendFile(__dirname + '/dist/index.html'));

app.use(favicon('./react-app/build/favicon.ico'));

// Switch off the default 'X-Powered-By: Express' header
app.disable('x-powered-by');

let room = 'party';
io.sockets.on("connection", socket => {

	// const rooms = io.sockets.adapter.rooms[room]

	const id = socket.id;
	const data = {
		id: id
	};

	socket.on("login", data => {
		console.log("Logged user id", data);
		socket.join(room);
		socket.emit("join", data);
	});

	socket.on("upload", data => {
		console.log("Sending image to room", room);
		socket.broadcast.to(room).emit('image', data);
	});
});
