/**
 * main.js
 */

$(function(){
	var talks = new Talks(".log")
		, socket = io.connect("http://"+location.host)

	socket.on('talk', function(data){
		talks.add(data, "emitted")
	})
});