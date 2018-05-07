(function(doc, io, $){
	'use strict'

	var io = io()

	$('#chat-form').on('submit', function(e){
		e.preventDefault()
		io.emit('new message', $('#message').val() )
		$('#message').val(null)
		return false
	})

	io.on('new user' , function(user){
		alert(user.message)
	})

	io.on('user says' , function(userSay){
		$('#chat').append('<li>' + userSay + '</li>')
	})
	io.on('user disconnect' , function(user){
		alert(user.message)
	})

})(document, io, jQuery)