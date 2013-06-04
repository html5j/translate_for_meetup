/**
 * main.js
 */

$(function(){
	var talks = new Talks(".log")
		, socket = io.connect("http://"+location.host)

	$(".main form textarea")
		.on("keydown", function(ev){
			if(ev.keyCode === 13 && ev.shiftKey) {
				var text_ = $(this).val().replace(/</g, "&lt;").replace(/>/g, "&gt;");
				var name_ = $("form input[name=name]").val();
				talks.add(name_, text_)
				$(this).val("");
				ev.preventDefault();
			}
		})

	$(talks).on("translated", function(e, name, en, ja){
		socket.emit('talk', {name: name, en: en, ja: ja})
	})

	socket.on('talk', function(data){
		talks.add(data.name, data.en, data.ja)
	})
});