/**
 * Translator
 */
 
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
			callback(res);
		})
	}
}
