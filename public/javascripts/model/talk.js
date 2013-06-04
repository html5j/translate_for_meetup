/**
 * Talk
 */

var Talk = function(obj){
	// [todo] 英語とか日本語とか自動翻訳結果とかをmodeで指定して、rederingの結果に
	// に反映させるようにするかもしれない
	this.id = obj.id; this.name = obj.name; this.ja = obj.ja; this.en = obj.en; this.fix = obj.fix;
}

Talk.prototype.render = function(){
	var template_trans_ = [
		"<dt>${name}</dt>",
		"<dd>",
		"<p class='ja'>${ja}</p>",
		"<p class='en'>${en}</p>",
		"<p><time>${timestamp}</time></p>",
		"</dd>"
	].join("")

	var template_fix_ = [
		"<dt>${name}</dt>",
		"<dd>",
		"<p class='fix'>${fix}</p>",
		"<p><time>${timestamp}</time></p>",
		"</dd>"
	].join("")

	var timestamp_ = new Date().toLocaleString(); 

	if(!!this.fix) {
		return template_fix_
			.replace("${name}", this.name)
			.replace("${fix}", this.fix)
			.replace("${timestamp}", timestamp_)
	} else if(!!this.ja || !!this.en) {
		var en_ = !!this.en ? this.en : "....."
			, ja_ = !!this.ja ? this.ja : "。。。。。"
			
		return template_trans_
			.replace("${name}", this.name)
			.replace("${ja}", ja_)
			.replace("${en}", en_)
			.replace("${timestamp}", timestamp_)
	} else {
		return "";
	}
}

