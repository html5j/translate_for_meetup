// class definition.

var Translator = function(){
	this.resource = "/translate";
}

Translator.prototype.en2ja = function(text, callback) {
	this.do(text, "en2ja", callback)
}
Translator.prototype.ja2en = function(text, callback) {
	this.do(text, "ja2en", callback)
}
Translator.prototype.do = function(text, indi, callback) {
	var url_ = [this.resource, indi, encodeURIComponent(text)].join("/")

	if(!true) {
		callback("だみーだみーだみーだみーだみーだみー")
	}

	if(!false) {
		$.get(url_, function(res, e){
			console.log(e);
			callback(res);
		})
	}
}



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




var Talk = function(name, en, ja){
	this.name = name; this.en = en; this.ja = ja;
	return  this.render();
}

Talk.prototype.render = function(){
	var template_ = [
		"<dt>${name}</dt>",
		"<dd>",
		"<div class='en'><span>English:</span><span class='text'>${en}</span></div>",
		"<div class='ja'><span>Japanese:</span><span class='text'>${ja}</span></div>",
		"</dd>"
	].join("")
	return template_.replace("${name}", this.name).replace("${en}", this.en).replace("${ja}", this.ja)
}




// main

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

