/**
 * Talks
 */


var Talks = function(selector){
	this.jqobj = $(selector)
	this.jqobj.html("<dl></dl>")

	this.translator = new Translator();
}
Talks.prototype.add = function(obj, mode){
	/** obj = {id: , ja: , en:, fix:} */

	var self = this;
	// [todo] validate name and text
	var add_ = function(obj) {
		var html_ = new Talk(obj).render();

		if($("#"+obj.id).length === 0){
			self.jqobj.find("dl").prepend("<p id='"+obj.id+"'></p>");
		}
		$("#"+obj.id).html(html_)
	};

	add_(obj)
	if(mode !== "emitted") {
		$(self).trigger('talk', [obj])
	}

	switch(mode){
	case "en2ja":
		this.translator.en2ja(obj.en, function(res){
			obj.ja = res;
			add_(obj)
			$(self).trigger('talk', [obj])
		});
		break;
	case "ja2en":
		this.translator.ja2en(obj.ja, function(res){
			obj.en = res;
			add_(obj);
			$(self).trigger('talk', [obj])
		});
		break;
	default:
		break;
	}
}
