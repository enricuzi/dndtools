function SocketLayer(props) {

	const {socket} = props;
	socket.on('upload', () => {});
	socket.on('create', () => {});
	socket.on('full', () => {});
	socket.on('bridge', () => {});
	socket.on('join', () => {});
	socket.on('approve', ({message, sid}) => {});
	this.logger.log("Emitting event 'find'...");
	socket.emit('find');
}
