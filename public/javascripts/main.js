/**
 * main.js
 */

$(function(){
	var talks = new Talks(".log")
		, trans_mode = new TransMode()
		, socket = io.connect("http://"+location.host)

	trans_mode.render("#translation-mode")

	$(".main form textarea")
		.on("keydown", function(ev){
			if(ev.keyCode === 13 && ev.shiftKey) {
				var text_ = $(this).val().replace(/</g, "&lt;").replace(/>/g, "&gt;");
				var name_ = $("form input[name=name]").val();
				talks.add(name_, text_, null, trans_mode.get())
				$(this).val("");
				ev.preventDefault();
			}
		})

	$(talks).on("translated", function(e, name, orig, auto){
		socket.emit('talk', {name: name, orig: orig, auto: auto})
	})

	socket.on('talk', function(data){
		talks.add(data.name, data.orig, data.auto, trans_mode.get())
	})
});