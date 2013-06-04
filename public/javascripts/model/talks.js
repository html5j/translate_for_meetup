/**
 * Talks
 */


var Talks = function(selector){
	this.jqobj = $(selector)
	this.jqobj.append("<dl></dl>")

	this.translator = new Translator();
}
Talks.prototype.add = function(name, orig, auto, mode /* en2ja, ja2en, null */){
	var self = this;
	// [todo] validate name and text
	var add_ = function(name, text) {
		var html_ = new Talk(name, text, null).render();
		self.jqobj.find("dl").prepend(html_);
		// var scrollHeight_ = self.jqobj[0].scrollHeight;

		// self.jqobj[0].scrollTop = scrollHeight_;
	};

	add_(name, orig)

	if(!!auto) {
		// in case received via socket.io
		add_(name, auto)
	} else {
		switch(mode){
		case "en2ja":
			this.translator.en2ja(orig, function(res){
				add_(name, res)
				$(self).trigger('translated', [name, orig, res])
			});
			break;
		case "ja2en":
			this.translator.ja2en(orig, function(res){
				add_(name, res)
				$(self).trigger('translated', [name, orig, res])
			});
			break;
		default:
			break;
		}
	}
}
