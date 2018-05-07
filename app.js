'use strict'

const	express = require('express'),
		app = express(),
		http = require('http').createServer(app),
		io = require('socket.io')(http),
		port = process.env.PORT || 3000,
		public_dir = express.static(`${__dirname}/public`)


app
	.use(public_dir)
	.get('/', (req, res) => {
		res.sendFile(`${public_dir}/index.html`)
	})


http.listen(port, () => {
	console.log('Server Running... ')
})

io.on('connection', (socket) => {
	
	socket.broadcast.emit("new user", { message: "new user conneted"} )
	socket.on('new message' , (message) => {
		io.emit('user says', message)
	})
	
	socket.on('disconnect', () => {
		console.log(`new user disconnected`)
		socket.broadcast.emit("user disconnected", { message: "new user disconnected"} )
	})
})


