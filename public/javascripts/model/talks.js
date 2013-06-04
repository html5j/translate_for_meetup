/**
 * Talks
 */


var Talks = function(selector){
	this.jqobj = $(selector)
	this.jqobj.append("<dl></dl>")

	this.translator = new Translator();
}
Talks.prototype.add = function(name, en, ja){
	var self = this;
	// [todo] validate name and text
	var add_ = function(name, en, ja) {
		var html_ = new Talk(name, en, ja).render();
		self.jqobj.find("dl").append(html_);
		var scrollHeight_ = self.jqobj[0].scrollHeight;

		self.jqobj[0].scrollTop = scrollHeight_;
	};
	console.log(en)

	if(!!ja) {
		add_(name, en, ja)
	} else {
		this.translator.en2ja(en, function(res){
			add_(name, en, res)
			$(self).trigger('translated', [name, en, res])
		});
	}
}
