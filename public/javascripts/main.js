/**
 * main.js
 */

$(function(){
	var talks = new Talks(".log")
		, trans_mode = new TransMode()
		, socket = io.connect("http://"+location.host)

	trans_mode.render("#translation-mode")

	var uuid_ = function(){
	    var S4 = function() {
	        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	    }   
	    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4() +S4());
	};

	$(".main form textarea")
		.on("keydown", function(ev){
			if(ev.keyCode === 13 ) { //&& ev.shiftKey) {
				var text_ = $(this).val().replace(/</g, "&lt;").replace(/>/g, "&gt;");
				var name_ = $("form input[name=name]").val();
				var mode_ = trans_mode.get();
				name_ = !!name_ ? name_ : "???"

				switch(mode_){
				case "en2ja":
					talks.add({id: uuid_(), name: name_, en: text_, ja: null, fix: null}, mode_);
					break;
				case "ja2en":
					talks.add({id: uuid_(), name: name_, en: null, ja: text_, fix: null}, mode_);
					break;
				case "none":
					talks.add({id: uuid_(), name: name_, en: null, ja: null, fix: text_}, mode_);
					break;
				}
				$(this).val("");
				ev.preventDefault();
			}
		})

	$(talks).on("talk", function(e, obj){
		socket.emit("talk", obj)
	})

	socket.on('talk', function(data){
		talks.add(data, "emitted")
	})
});