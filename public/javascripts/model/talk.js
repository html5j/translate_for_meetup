/**
 * Talk
 */

var Talk = function(name, text, mode){
	// [todo] 英語とか日本語とか自動翻訳結果とかをmodeで指定して、rederingの結果に
	// に反映させるようにするかもしれない
	this.name = name; this.text = text; this.mode = mode;
	return  this.render();
}

Talk.prototype.render = function(){
	var template_ = [
		"<dt>${name}</dt>",
		"<dd>",
		"<p><span class='mode'></span><span class='text'>${text}</span></p>",
		"<p><time>${timestamp}</time></p>",
		"</dd>"
	].join("")

	var timestamp_ = new Date().toLocaleString(); 
	return template_
		.replace("${name}", this.name)
		.replace("${text}", this.text)
		.replace("${timestamp}", timestamp_)
}

