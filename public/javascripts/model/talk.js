/**
 * Talk
 */

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

