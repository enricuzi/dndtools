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

app.use(express.json());

app.post("/log", (req, res) => {
	const log = req.body;
	console.log(log);
});

