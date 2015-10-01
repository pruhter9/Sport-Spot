module.exports = function(io) {
	io.sockets.on('connection', function(socket){
		console.log("WE ARE USING SOCKETS!")
		console.log(socket.id)
		socket.on('msgSend', function(data){
			console.log('msg received', data)
			socket.broadcast.emit('broadcastMsg', data)
		})
	})
}