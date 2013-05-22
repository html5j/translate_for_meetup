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
Talks.prototype.add = function(name, en){
	// [todo] validate name and text
	this.translator.en2ja(en, function(ja){
		var html_ = new Talk(name, en, ja).render();
		this.jqobj.find("dl").append(html_);
		var scrollHeight_ = this.jqobj[0].scrollHeight;

		this.jqobj[0].scrollTop = scrollHeight_;
	}.bind(this));
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

var talks = new Talks(".log");

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

