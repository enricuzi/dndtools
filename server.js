const express = require('express');
const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');
const sio = require('socket.io');
const favicon = require('serve-favicon');
const compression = require('compression');

console.log('NODE_ENV', process.env.NODE_ENV)

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
	if (password.toLowerCase() === "master") {
		console.log("User logged id as master", username);
		res.status(200).send({
			type: "master"
		});
	} else if (password.toLowerCase() === "player") {
		console.log("User logged id as player", username);
		res.status(200).send({
			type: "player"
		});
	} else {
		console.log("Cannot log user");
		res.send(401);
	}
});

app.use((req, res) => res.sendFile(__dirname + '/dist/index.html'));

app.use(favicon('./react-app/build/favicon.ico'));

// Switch off the default 'X-Powered-By: Express' header
app.disable('x-powered-by');

const room = 'party';
const users = [];
io.sockets.on("connection", socket => {

	// const rooms = io.sockets.adapter.rooms[room]
	// const id = socket.id;

	// data: {type: "master|player", id: "[username]"}
	socket.on("login", data => {
		console.log("Logged in user", data);
		socket.join(room);
		if (!users.find(user => user.id === data.id)) {
			users.push(data);
		}
		socket.broadcast.to(room).emit('join', users);
		socket.emit("join", users);
	});

	socket.on("logout", data => {
		console.log("Logged out user", data);
		const index = users.findIndex(user => user.id === data.id);
		users.splice(index, 1);
		socket.broadcast.to(room).emit('leave', users);
		socket.emit("leave", users);
	});

	socket.on("upload", data => {
		console.log("Sending image to room", room, "from user", data.user);
		socket.broadcast.to(room).emit('image', data);
	});

	socket.on("roll", data => {
		console.log("User rolled value", data);
		users.find(user => user.id === data.id).rolls = data.rolls;
		socket.broadcast.to(room).emit('roll', users);
	})
});
